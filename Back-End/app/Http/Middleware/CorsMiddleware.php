<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Define allowed origins
        $allowedOrigins = [
            'https://www.bnbatiment.com',
            'https://bnbatiment.com',
            'http://localhost:3000',
            'http://localhost:5173'
        ];
        
        // Get the request origin
        $origin = $request->header('Origin');
        
        // Check if origin is allowed
        $allowedOrigin = in_array($origin, $allowedOrigins) ? $origin : null;
        
        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200);
            
            if ($allowedOrigin) {
                $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
                $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
                $response->headers->set('Access-Control-Max-Age', '86400');
            }
            
            return $response;
        }
        
        // Process the request
        $response = $next($request);

        // Add CORS headers to the response
        if ($allowedOrigin) {
            // Remove any existing CORS headers to prevent duplicates
            $response->headers->remove('Access-Control-Allow-Origin');
            $response->headers->remove('Access-Control-Allow-Methods');
            $response->headers->remove('Access-Control-Allow-Headers');
            $response->headers->remove('Access-Control-Allow-Credentials');
            $response->headers->remove('Access-Control-Max-Age');

            // Add CORS headers with single values only
            $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
            $response->headers->set('Access-Control-Max-Age', '86400');
        }

        return $response;
    }
} 