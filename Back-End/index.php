<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// CORS Headers - Handle preflight requests FIRST
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($origin && $origin !== '*') {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        header('Access-Control-Allow-Origin: *');
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    exit(0);
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/bootstrap/app.php';

$response = $app->handleRequest(Request::capture());

// Add CORS headers to response
if ($origin && $origin !== '*') {
    $response->headers->set('Access-Control-Allow-Origin', $origin);
} else {
    $response->headers->set('Access-Control-Allow-Origin', '*');
}

$response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
$response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
$response->headers->set('Access-Control-Max-Age', '86400');

$response->send(); 