<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class LocalUploadController extends Controller
{
    /**
     * Upload image to local storage
     */
    public function upload(Request $request)
    {
        Log::info('====================================');
        Log::info('LOCAL UPLOAD ATTEMPT STARTED');
        Log::info('Time: ' . now());
        Log::info('====================================');
        
        try {
            // Log request details
            Log::info('Request Method: ' . $request->method());
            Log::info('Content Type: ' . $request->header('Content-Type'));
            Log::info('Has File (image): ' . ($request->hasFile('image') ? 'YES' : 'NO'));
            
            // Check if file is present
            if (!$request->hasFile('image')) {
                Log::error('ERROR: No file in request');
                return response()->json([
                    'success' => false,
                    'error' => 'No file uploaded',
                    'message' => 'Please select an image file to upload',
                ], 400)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            }

            // Validate the uploaded file
            Log::info('Starting validation...');
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
            ]);
            Log::info('Validation passed');

            $file = $request->file('image');
            
            Log::info('File Details:', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType(),
            ]);

            // Generate unique filename
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = Str::slug($originalName) . '_' . uniqid() . '.' . $extension;
            
            Log::info('Generated filename: ' . $filename);

            // Define storage path - directly in public/uploads/services
            $destinationPath = public_path('uploads/services');
            
            // Ensure directory exists
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0775, true);
                Log::info('Created directory: ' . $destinationPath);
            }
            
            // Move the file to public/uploads/services
            $file->move($destinationPath, $filename);
            
            $relativePath = 'uploads/services/' . $filename;
            Log::info('File stored at: ' . $relativePath);

            // Generate the public URL
            // For production: https://api.bnbatiment.com/uploads/services/filename.jpg
            // For local: http://localhost:8000/uploads/services/filename.jpg
            $publicUrl = url($relativePath);
            
            Log::info('SUCCESS! File URL: ' . $publicUrl);

            return response()->json([
                'success' => true,
                'url' => $publicUrl,
                'filename' => $filename,
                'path' => $relativePath,
                'message' => 'Image uploaded successfully',
            ], 200)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('VALIDATION ERROR:', ['errors' => $e->errors(), 'message' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'message' => $e->getMessage(),
                'details' => $e->errors(),
            ], 422)->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        } catch (\Exception $e) {
            Log::error('EXCEPTION ERROR:', [
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
     * Delete image from local storage
     */
    public function destroy(Request $request)
    {
        try {
            $request->validate([
                'filename' => 'required|string',
            ]);

            $filename = $request->input('filename');
            $filePath = public_path('uploads/services/' . $filename);
            
            // Delete from public directory
            if (file_exists($filePath)) {
                unlink($filePath);
                Log::info('File deleted successfully:', ['path' => $filePath]);

                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully',
                ], 200);
            } else {
                Log::warning('File not found:', ['path' => $filePath]);
                return response()->json([
                    'success' => false,
                    'error' => 'File not found',
                    'message' => 'The specified file does not exist',
                ], 404);
            }

        } catch (\Exception $e) {
            Log::error('Delete error:', [
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

