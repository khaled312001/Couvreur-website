<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
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
        } catch (\Exception $e) {
            Log::error('API Error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'url' => $request->fullUrl(),
                'method' => $request->method()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred',
                'details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ] : null
            ], 500);
        }
    }
} 