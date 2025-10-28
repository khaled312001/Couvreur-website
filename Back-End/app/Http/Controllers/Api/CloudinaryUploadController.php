<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Cloudinary\Cloudinary;

class CloudinaryUploadController extends Controller
{
    /**
     * Upload image to Cloudinary
     */
    public function upload(Request $request)
    {
        // Clear log and start fresh
        \Log::info('====================================');
        \Log::info('CLOUDINARY UPLOAD ATTEMPT STARTED');
        \Log::info('Time: ' . now());
        \Log::info('====================================');
        
        try {
            // Log request details
            \Log::info('Request Method: ' . $request->method());
            \Log::info('Content Type: ' . $request->header('Content-Type'));
            \Log::info('Has File (image): ' . ($request->hasFile('image') ? 'YES' : 'NO'));
            \Log::info('All Files: ', $request->allFiles());
            \Log::info('All Input: ', $request->all());
            
            // Check if file is present
            if (!$request->hasFile('image')) {
                \Log::error('ERROR: No file in request');
                return response()->json([
                    'success' => false,
                    'error' => 'No file uploaded',
                    'message' => 'Please select an image file to upload',
                ], 400)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }

            // Log Cloudinary config
            \Log::info('Cloudinary URL set: ' . (!empty(config('cloudinary.cloud_url')) ? 'YES' : 'NO'));
            \Log::info('Cloudinary Cloud Name: ' . config('cloudinary.cloud_name', 'NOT SET'));

            // Validate the uploaded file
            \Log::info('Starting validation...');
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            ]);
            \Log::info('Validation passed');

            $file = $request->file('image');
            $path = $file->getRealPath();
            
            \Log::info('File Details:', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType(),
                'path' => $path,
                'readable' => is_readable($path),
            ]);

            // Check if Cloudinary is configured
            $cloudinaryUrl = config('cloudinary.cloud_url');
            if (empty($cloudinaryUrl)) {
                \Log::error('ERROR: Cloudinary URL not configured');
                return response()->json([
                    'success' => false,
                    'error' => 'Cloudinary not configured',
                    'message' => 'Cloudinary URL is not configured on the server. Please contact administrator.',
                ], 500)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }

            // Upload to Cloudinary
            \Log::info('Starting Cloudinary upload...');
            \Log::info('Upload path: ' . $path);
            
            // Initialize Cloudinary with proper configuration array
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('cloudinary.cloud_name', 'dxyczvtd1'),
                    'api_key' => config('cloudinary.api_key', '667964626244861'),
                    'api_secret' => config('cloudinary.api_secret', 'Q-W2KrzSH4wMSTxYlvgSmBAG77s'),
                ]
            ]);
            
            $uploadResult = $cloudinary->uploadApi()->upload($path, [
                'folder' => 'bnbatiment/services',
                'resource_type' => 'image',
                'public_id' => 'service_' . uniqid(),
            ]);
            
            \Log::info('Cloudinary upload completed');
            \Log::info('Upload Result Type: ' . gettype($uploadResult));
            
            // Get upload result - handle both array and object responses
            $resultArray = is_array($uploadResult) ? $uploadResult : $uploadResult->getArrayCopy();
            \Log::info('Result Array: ', $resultArray);
            
            $secureUrl = $resultArray['secure_url'] ?? null;
            $publicId = $resultArray['public_id'] ?? null;
            
            if (!$secureUrl) {
                \Log::error('ERROR: Upload succeeded but no URL returned');
                return response()->json([
                    'success' => false,
                    'error' => 'Upload incomplete',
                    'message' => 'Image uploaded but URL not returned from Cloudinary',
                ], 500)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }
            
            \Log::info('SUCCESS! Cloudinary URL: ' . $secureUrl);
            \Log::info('Public ID: ' . $publicId);

            return response()->json([
                'success' => true,
                'url' => $secureUrl,
                'public_id' => $publicId,
                'message' => 'Image uploaded successfully',
            ], 200)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('VALIDATION ERROR:', ['errors' => $e->errors(), 'message' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'message' => $e->getMessage(),
                'details' => $e->errors(),
            ], 422)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Exception $e) {
            \Log::error('EXCEPTION ERROR:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
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
            
            // Initialize Cloudinary for deletion
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('cloudinary.cloud_name', 'dxyczvtd1'),
                    'api_key' => config('cloudinary.api_key', '667964626244861'),
                    'api_secret' => config('cloudinary.api_secret', 'Q-W2KrzSH4wMSTxYlvgSmBAG77s'),
                ]
            ]);
            
            // Delete from Cloudinary using the admin API
            $result = $cloudinary->adminApi()->deleteAssets([$publicId], [
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
