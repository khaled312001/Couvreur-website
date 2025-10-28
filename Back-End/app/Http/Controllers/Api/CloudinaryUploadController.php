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
            // Check if file is present
            if (!$request->hasFile('image')) {
                return response()->json([
                    'success' => false,
                    'error' => 'No file uploaded',
                    'message' => 'Please select an image file to upload',
                ], 400)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }

            // Log the incoming request for debugging
            Log::info('Cloudinary upload started', [
                'has_file' => $request->hasFile('image'),
                'cloud_url_set' => !empty(config('cloudinary.cloud_url')),
            ]);

            // Validate the uploaded file
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            ]);

            $file = $request->file('image');
            $path = $file->getRealPath();
            
            Log::info('File ready for upload:', [
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'readable' => is_readable($path),
            ]);

            // Check if Cloudinary is configured
            $cloudinaryUrl = config('cloudinary.cloud_url');
            if (empty($cloudinaryUrl)) {
                Log::error('Cloudinary URL not configured');
                return response()->json([
                    'success' => false,
                    'error' => 'Cloudinary not configured',
                    'message' => 'Cloudinary URL is not configured on the server. Please contact administrator.',
                ], 500)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }

            // Upload to Cloudinary
            Log::info('Starting Cloudinary upload...');
            $uploadResult = Cloudinary::uploadApi()->upload($path, [
                'folder' => 'bnbatiment/services',
                'resource_type' => 'image',
                'public_id' => 'service_' . uniqid(),
            ]);
            
            // Get upload result - handle both array and object responses
            $resultArray = is_array($uploadResult) ? $uploadResult : $uploadResult->getArrayCopy();
            $secureUrl = $resultArray['secure_url'] ?? null;
            $publicId = $resultArray['public_id'] ?? null;
            
            if (!$secureUrl) {
                Log::error('Upload succeeded but no URL returned', ['result' => $resultArray]);
                return response()->json([
                    'success' => false,
                    'error' => 'Upload incomplete',
                    'message' => 'Image uploaded but URL not returned from Cloudinary',
                ], 500)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }
            
            Log::info('Cloudinary upload successful:', [
                'public_id' => $publicId,
                'url' => $secureUrl,
            ]);

            return response()->json([
                'success' => true,
                'url' => $secureUrl,
                'public_id' => $publicId,
                'message' => 'Image uploaded successfully',
            ], 200)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error:', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'message' => $e->getMessage(),
                'details' => $e->errors(),
            ], 422)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Exception $e) {
            Log::error('Cloudinary upload error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => substr($e->getTraceAsString(), 0, 500),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Upload failed',
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

