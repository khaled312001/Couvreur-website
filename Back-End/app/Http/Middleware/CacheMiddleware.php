<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CacheMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Skip caching for authenticated users and admin routes
        if (auth()->guard('sanctum')->check() || $request->is('admin/*') || $request->is('api/auth/*')) {
            return $next($request);
        }

        // Generate cache key based on request
        $cacheKey = $this->generateCacheKey($request);
        
        // Check if response is cached
        if (Cache::has($cacheKey)) {
            $cachedResponse = Cache::get($cacheKey);
            return response($cachedResponse['content'])
                ->header('Content-Type', $cachedResponse['content_type'])
                ->header('X-Cache', 'HIT')
                ->header('Cache-Control', 'public, max-age=3600, s-maxage=86400')
                ->header('ETag', $cachedResponse['etag'])
                ->header('Last-Modified', $cachedResponse['last_modified']);
        }

        // Get the response
        $response = $next($request);

        // Only cache successful responses
        if ($response->getStatusCode() === 200 && $request->isMethod('GET')) {
            $this->cacheResponse($request, $response, $cacheKey);
        }

        // Add cache headers to all responses
        return $this->addCacheHeaders($response, $request);
    }

    /**
     * Generate a unique cache key for the request
     */
    private function generateCacheKey(Request $request): string
    {
        $key = 'api_cache_' . md5(
            $request->url() . 
            $request->getQueryString() . 
            $request->header('Accept-Language', 'fr') .
            $request->header('User-Agent', '')
        );
        
        return $key;
    }

    /**
     * Cache the response
     */
    private function cacheResponse(Request $request, Response $response, string $cacheKey): void
    {
        $content = $response->getContent();
        $etag = md5($content);
        $lastModified = gmdate('D, d M Y H:i:s T');
        
        $cacheData = [
            'content' => $content,
            'content_type' => $response->headers->get('Content-Type', 'application/json'),
            'etag' => $etag,
            'last_modified' => $lastModified,
            'created_at' => now(),
        ];

        // Cache for different durations based on endpoint
        $cacheDuration = $this->getCacheDuration($request);
        Cache::put($cacheKey, $cacheData, $cacheDuration);
    }

    /**
     * Get cache duration based on endpoint
     */
    private function getCacheDuration(Request $request): int
    {
        $path = $request->path();
        
        // Static content - cache longer
        if (str_contains($path, 'services') || str_contains($path, 'gallery')) {
            return 3600; // 1 hour
        }
        
        // Dynamic content - cache shorter
        if (str_contains($path, 'blog') || str_contains($path, 'testimonials')) {
            return 1800; // 30 minutes
        }
        
        // Default cache duration
        return 900; // 15 minutes
    }

    /**
     * Add appropriate cache headers to the response
     */
    private function addCacheHeaders(Response $response, Request $request): Response
    {
        $path = $request->path();
        
        // Set cache control headers based on content type
        if (str_contains($path, 'services') || str_contains($path, 'gallery')) {
            // Static content - longer cache
            $response->headers->set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s T', time() + 3600));
        } elseif (str_contains($path, 'blog') || str_contains($path, 'testimonials')) {
            // Dynamic content - shorter cache
            $response->headers->set('Cache-Control', 'public, max-age=1800, s-maxage=3600');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s T', time() + 1800));
        } else {
            // Default cache
            $response->headers->set('Cache-Control', 'public, max-age=900, s-maxage=1800');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s T', time() + 900));
        }

        // Add ETag for conditional requests
        $etag = md5($response->getContent());
        $response->headers->set('ETag', $etag);
        
        // Add Last-Modified header
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s T'));
        
        // Add Vary header for proper caching
        $response->headers->set('Vary', 'Accept-Language, User-Agent');
        
        // Add X-Cache header
        $response->headers->set('X-Cache', 'MISS');
        
        return $response;
    }
} 