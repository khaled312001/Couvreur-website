<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // If the response is already JSON, return it as is
        if ($response->headers->get('Content-Type') === 'application/json') {
            return $response;
        }

        // For other responses, wrap them in a standard format
        $data = $response->getContent();
        
        return response()->json([
            'success' => $response->getStatusCode() < 400,
            'data' => $data,
            'message' => $response->getStatusCode() < 400 ? 'Success' : 'Error'
        ], $response->getStatusCode());
    }
} 