<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function serve($folder, $filename)
    {
        $path = public_path("uploads/{$folder}/{$filename}");
        
        if (!file_exists($path)) {
            abort(404, 'Image not found');
        }
        
        $file = file_get_contents($path);
        $type = mime_content_type($path);
        
        return response($file, 200)
            ->header('Content-Type', $type)
            ->header('Cache-Control', 'public, max-age=31536000')
            ->header('Access-Control-Allow-Origin', '*');
    }
} 