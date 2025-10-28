<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CloudinaryUploadController extends Controller
{
    /**
     * Upload image to Cloudinary
     */
    public function upload(Request $request)
    {
        try {
            // Log the incoming request for debugging
            Log::info('Cloudinary upload started', [
                'has_file' => $request->hasFile('image'),
                'file_size' => $request->file('image') ? $request->file('image')->getSize() : null,
                'file_name' => $request->file('image') ? $request->file('image')->getClientOriginalName() : null,
                'cloud_url' => config('cloudinary.cloud_url') ? 'SET' : 'NOT SET',
            ]);

            // Validate the uploaded file
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
            ]);

            $file = $request->file('image');
            
            // Get file path (use temp path instead of real path)
            $path = $file->getPathname();
            
            // Log file information
            Log::info('File information:', [
                'path' => $path,
                'real_path' => $file->getRealPath(),
                'size' => $file->getSize(),
                'readable' => is_readable($path),
                'readable_real' => is_readable($file->getRealPath()),
            ]);

            // Check if Cloudinary is configured
            $cloudinaryUrl = config('cloudinary.cloud_url');
            if (empty($cloudinaryUrl)) {
                throw new \Exception('Cloudinary URL is not configured');
            }

            // Upload to Cloudinary using the upload method
            $uploadResult = Cloudinary::uploadApi()->upload($path, [
                'folder' => 'bnbatiment/services',
                'resource_type' => 'image',
            ]);
            
            // Convert ApiResponse (ArrayObject) to array for safe access
            $resultArray = (array) $uploadResult;
            
            // Get the upload result details
            $secureUrl = $resultArray['secure_url'] ?? $resultArray['url'] ?? null;
            $publicId = $resultArray['public_id'] ?? null;
            $format = $resultArray['format'] ?? pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            
            // Log the upload result for debugging
            Log::info('Cloudinary upload result:', [
                'public_id' => $publicId,
                'secure_url' => $secureUrl,
                'format' => $format,
            ]);

            return response()->json([
                'success' => true,
                'url' => $secureUrl,
                'public_id' => $publicId,
                'format' => $format,
                'width' => $resultArray['width'] ?? null,
                'height' => $resultArray['height'] ?? null,
            ], 200)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Exception $e) {
            Log::error('Cloudinary upload error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Failed to upload image',
                'message' => $e->getMessage(),
                'details' => 'Check server logs for more information',
            ], 500)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        }
    }

    /**
     * Delete image from Cloudinary
     */
    public function destroy(Request $request)
    {
        try {
            $request->validate([
                'public_id' => 'required|string',
            ]);

            $publicId = $request->input('public_id');
            
            // Delete from Cloudinary using the admin API
            $result = Cloudinary::adminApi()->deleteAssets([$publicId], [
                'resource_type' => 'image',
            ]);

            Log::info('Cloudinary delete successful:', ['public_id' => $publicId]);

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Cloudinary delete error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Failed to delete image',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

