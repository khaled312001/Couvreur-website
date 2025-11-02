<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// CORS Headers - Handle before Laravel loads
// Try multiple ways to get the Origin header (different servers handle this differently)
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if (!$origin && isset($_SERVER['HTTP_REFERER'])) {
    // Try to extract origin from referer
    $referer = $_SERVER['HTTP_REFERER'];
    $parsed = parse_url($referer);
    if ($parsed) {
        $origin = $parsed['scheme'] . '://' . $parsed['host'];
        if (isset($parsed['port']) && !in_array($parsed['port'], [80, 443])) {
            $origin .= ':' . $parsed['port'];
        }
    }
}
if (!$origin && function_exists('getallheaders')) {
    $headers = getallheaders();
    $origin = $headers['Origin'] ?? $headers['origin'] ?? null;
}

$allowedOrigins = [
    'https://www.bnbatiment.com',
    'https://bnbatiment.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
];

// Handle preflight OPTIONS requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CRITICAL: Must set headers in correct order and format
    $allowedOrigin = null;
    if ($origin && in_array($origin, $allowedOrigins)) {
        $allowedOrigin = $origin;
    }
    
    if ($allowedOrigin) {
        header('Access-Control-Allow-Origin: ' . $allowedOrigin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        // For OPTIONS, if origin not in allowed list, still respond with headers
        // but don't allow credentials
        if ($origin) {
            header('Access-Control-Allow-Origin: ' . $origin);
        } else {
            header('Access-Control-Allow-Origin: *');
        }
        // Don't set credentials when using wildcard or unknown origin
    }
    
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
    header('Access-Control-Max-Age: 86400');
    
    // Ensure no output before headers
    http_response_code(200);
    exit(0);
}

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
*/

if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
*/

require __DIR__.'/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
*/

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$request = Request::capture();
$response = $kernel->handle($request);

// Add CORS headers to ALL responses - ALWAYS set them
// Re-check origin in case it wasn't available before Laravel loaded
if (!$origin) {
    $origin = $request->header('Origin');
}
if (!$origin && isset($_SERVER['HTTP_REFERER'])) {
    $referer = $_SERVER['HTTP_REFERER'];
    $parsed = parse_url($referer);
    if ($parsed) {
        $origin = $parsed['scheme'] . '://' . $parsed['host'];
        if (isset($parsed['port']) && !in_array($parsed['port'], [80, 443])) {
            $origin .= ':' . $parsed['port'];
        }
    }
}

// Note: When using credentials, we must use specific origin, not '*'
// Always check if origin is in allowed list
$allowedOrigin = null;
if ($origin && in_array($origin, $allowedOrigins)) {
    $allowedOrigin = $origin;
    $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
    $response->headers->set('Access-Control-Allow-Credentials', 'true');
} else {
    // For non-allowed origins or missing origin, set wildcard but no credentials
    // This allows API access from any origin (for public APIs)
    $response->headers->set('Access-Control-Allow-Origin', $origin ?: '*');
    // Do NOT set credentials when using wildcard
}

$response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
$response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
$response->headers->set('Access-Control-Max-Age', '86400');

$response->send();

$kernel->terminate($request, $response); 