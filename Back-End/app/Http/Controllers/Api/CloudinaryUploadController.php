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
            // Validate the uploaded file
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
            ]);

            // Upload to Cloudinary
            $uploadResult = $request->file('image')->storeOnCloudinary('bnbatiment/services');

            // Log the upload result for debugging
            Log::info('Cloudinary upload result:', [
                'public_id' => $uploadResult->getPublicId(),
                'secure_url' => $uploadResult->getSecurePath(),
                'url' => $uploadResult->getPath(),
            ]);

            return response()->json([
                'success' => true,
                'url' => $uploadResult->getSecurePath(),
                'public_id' => $uploadResult->getPublicId(),
                'format' => $uploadResult->getExtension(),
                'width' => $uploadResult->getWidth(),
                'height' => $uploadResult->getHeight(),
            ], 200)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Exception $e) {
            Log::error('Cloudinary upload error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Failed to upload image',
                'message' => $e->getMessage(),
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
            
            // Delete from Cloudinary
            Cloudinary::destroy($publicId);

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

