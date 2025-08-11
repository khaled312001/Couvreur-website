<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;

class ImageOptimizationService
{
    /**
     * Optimize image based on request parameters
     */
    public function optimizeImage(string $imagePath, Request $request)
    {
        // Check if image exists
        if (!Storage::disk('public')->exists($imagePath)) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        // Generate cache key based on request parameters
        $cacheKey = $this->generateCacheKey($imagePath, $request);
        
        // Check if optimized version is cached
        if (Cache::has($cacheKey)) {
            $cachedImage = Cache::get($cacheKey);
            return response($cachedImage['content'])
                ->header('Content-Type', $cachedImage['content_type'])
                ->header('Cache-Control', 'public, max-age=31536000, immutable')
                ->header('ETag', $cachedImage['etag'])
                ->header('X-Cache', 'HIT');
        }

        // Get image parameters from request
        $width = $request->get('w', 800);
        $height = $request->get('h', 600);
        $quality = $request->get('q', 80);
        $format = $request->get('f', 'webp');

        // Validate parameters
        $width = min(max((int)$width, 100), 2000);
        $height = min(max((int)$height, 100), 2000);
        $quality = min(max((int)$quality, 10), 100);

        // Load and optimize image
        $image = Image::make(Storage::disk('public')->path($imagePath));
        
        // Resize image maintaining aspect ratio
        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Convert to requested format
        $optimizedImage = $this->convertImage($image, $format, $quality);

        // Cache the optimized image
        $this->cacheOptimizedImage($cacheKey, $optimizedImage, $format);

        // Return optimized image with proper headers
        return response($optimizedImage)
            ->header('Content-Type', $this->getMimeType($format))
            ->header('Cache-Control', 'public, max-age=31536000, immutable')
            ->header('ETag', md5($optimizedImage))
            ->header('X-Cache', 'MISS');
    }

    /**
     * Convert image to specified format
     */
    private function convertImage($image, string $format, int $quality)
    {
        switch (strtolower($format)) {
            case 'webp':
                return $image->encode('webp', $quality);
            case 'jpg':
            case 'jpeg':
                return $image->encode('jpg', $quality);
            case 'png':
                return $image->encode('png', $quality);
            default:
                return $image->encode('webp', $quality);
        }
    }

    /**
     * Get MIME type for format
     */
    private function getMimeType(string $format): string
    {
        $mimeTypes = [
            'webp' => 'image/webp',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png'
        ];

        return $mimeTypes[strtolower($format)] ?? 'image/webp';
    }

    /**
     * Generate cache key for optimized image
     */
    private function generateCacheKey(string $imagePath, Request $request): string
    {
        $params = [
            'path' => $imagePath,
            'w' => $request->get('w', 800),
            'h' => $request->get('h', 600),
            'q' => $request->get('q', 80),
            'f' => $request->get('f', 'webp')
        ];

        return 'optimized_image_' . md5(serialize($params));
    }

    /**
     * Cache optimized image
     */
    private function cacheOptimizedImage(string $cacheKey, $imageData, string $format): void
    {
        $cacheData = [
            'content' => $imageData,
            'content_type' => $this->getMimeType($format),
            'etag' => md5($imageData),
            'created_at' => now()
        ];

        // Cache for 1 year since images are immutable
        Cache::put($cacheKey, $cacheData, 31536000);
    }

    /**
     * Generate responsive image URLs for different sizes
     */
    public function generateResponsiveUrls(string $imagePath): array
    {
        $sizes = [
            'mobile' => ['w' => 400, 'h' => 300],
            'tablet' => ['w' => 800, 'h' => 600],
            'desktop' => ['w' => 1200, 'h' => 900]
        ];

        $urls = [];
        foreach ($sizes as $size => $dimensions) {
            $urls[$size] = url("/api/optimize-image?path={$imagePath}&w={$dimensions['w']}&h={$dimensions['h']}&f=webp&q=80");
        }

        return $urls;
    }

    /**
     * Batch optimize multiple images
     */
    public function batchOptimize(array $imagePaths, array $sizes = []): array
    {
        if (empty($sizes)) {
            $sizes = [
                'thumbnail' => ['w' => 150, 'h' => 150],
                'small' => ['w' => 400, 'h' => 300],
                'medium' => ['w' => 800, 'h' => 600],
                'large' => ['w' => 1200, 'h' => 900]
            ];
        }

        $optimized = [];
        foreach ($imagePaths as $imagePath) {
            $optimized[$imagePath] = $this->generateResponsiveUrls($imagePath);
        }

        return $optimized;
    }

    /**
     * Clean up old cached images
     */
    public function cleanupOldCache(): int
    {
        $cleaned = 0;
        $cacheKeys = Cache::get('image_cache_keys', []);

        foreach ($cacheKeys as $key) {
            if (Cache::has($key)) {
                $cached = Cache::get($key);
                $createdAt = $cached['created_at'] ?? now();
                
                // Remove cache older than 30 days
                if ($createdAt->diffInDays(now()) > 30) {
                    Cache::forget($key);
                    $cleaned++;
                }
            }
        }

        return $cleaned;
    }
} 