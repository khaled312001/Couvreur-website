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
        $allowedOrigin = null;
        if ($origin && in_array($origin, $allowedOrigins)) {
            $allowedOrigin = $origin;
        }
        
        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200);
            
            if ($allowedOrigin) {
                $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
            } else {
                $response->headers->set('Access-Control-Allow-Origin', '*');
            }
            
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
            $response->headers->set('Access-Control-Max-Age', '86400');
            
            return $response;
        }
        
        // Process the request
        $response = $next($request);

        // Add CORS headers to the response
        // Note: When using credentials, we must use specific origin, not '*'
        if ($allowedOrigin) {
            $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        } else {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        }
        
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
        $response->headers->set('Access-Control-Max-Age', '86400');

        return $response;
    }
} 