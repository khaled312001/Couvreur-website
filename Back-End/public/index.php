<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
|
| If the application is in maintenance / demo mode via the "down" command
| we will load this file so that any pre-rendered content can be shown
| instead of starting the framework, which could cause an exception.
|
*/

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here so we don't need to manually load our classes.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

// Add CORS headers - ALWAYS set them
// Try multiple ways to get the Origin header (different servers handle this differently)
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if (!$origin && function_exists('getallheaders')) {
    $headers = getallheaders();
    $origin = $headers['Origin'] ?? $headers['origin'] ?? null;
}

// Define allowed origins
$allowedOrigins = [
    'https://www.bnbatiment.com',
    'https://bnbatiment.com',
    'http://localhost:3000',
    'http://localhost:5173'
];

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Validate and set the origin
    // Note: When using credentials, we must use specific origin, not '*'
    if ($origin && in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        header('Access-Control-Allow-Origin: *');
    }
    
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    exit(0);
}

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$request = Request::capture();
$response = $kernel->handle($request);

// Add CORS headers to ALL responses
// Note: When using credentials, we must use specific origin, not '*'
if ($origin && in_array($origin, $allowedOrigins)) {
    $response->headers->set('Access-Control-Allow-Origin', $origin);
    $response->headers->set('Access-Control-Allow-Credentials', 'true');
} else {
    $response->headers->set('Access-Control-Allow-Origin', '*');
}

$response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
$response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
$response->headers->set('Access-Control-Max-Age', '86400');

$response->send();

$kernel->terminate($request, $response);
