<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Get allowed origins from environment or use default
        $allowedOrigins = env('CORS_ALLOWED_ORIGINS', 'https://www.bnbatiment.com');
        $origins = array_map('trim', explode(',', $allowedOrigins));
        
        // Check if the request origin is in the allowed list
        $origin = $request->header('Origin');
        
        // If origin is in allowed list, use it; otherwise use the first allowed origin
        $allowedOrigin = in_array($origin, $origins) ? $origin : $origins[0];

        // Remove any existing CORS headers to prevent duplicates
        $response->headers->remove('Access-Control-Allow-Origin');
        $response->headers->remove('Access-Control-Allow-Methods');
        $response->headers->remove('Access-Control-Allow-Headers');
        $response->headers->remove('Access-Control-Allow-Credentials');
        $response->headers->remove('Access-Control-Max-Age');

        // Add CORS headers with single values only - ensure only one origin is set
        $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Max-Age', '86400');

        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            $response->setStatusCode(200);
            $response->setContent('');
        }

        return $response;
    }
} 