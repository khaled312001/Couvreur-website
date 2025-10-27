<?php
/**
 * API Check Script
 * Place this in your public directory to test if the API is accessible
 * Access it at: https://api.bnbatiment.com/api-check.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check Laravel installation
$response = [
    'status' => 'ok',
    'message' => 'API Check Script',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => [
        'domain' => $_SERVER['HTTP_HOST'] ?? 'unknown',
        'uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
        'method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
    ],
];

// Check if Laravel files exist
$laravel_files = [
    'vendor/autoload.php' => file_exists(__DIR__ . '/../vendor/autoload.php'),
    'bootstrap/app.php' => file_exists(__DIR__ . '/../bootstrap/app.php'),
    'routes/api.php' => file_exists(__DIR__ . '/../routes/api.php'),
];

$response['laravel_files'] = $laravel_files;

// Check if routes exist
$routes_exist = true;
foreach ($laravel_files as $file => $exists) {
    if (!$exists) {
        $routes_exist = false;
        break;
    }
}

// Try to load Laravel routes
if ($routes_exist) {
    try {
        require __DIR__ . '/../vendor/autoload.php';
        $app = require_once __DIR__ . '/../bootstrap/app.php';
        
        $response['laravel'] = [
            'loaded' => true,
            'version' => $app->version(),
            'environment' => $app->environment(),
        ];
        
        $response['routes_count'] = count((new Illuminate\Support\Facades\Route::getRoutes())->getRoutes());
    } catch (Exception $e) {
        $response['laravel'] = [
            'loaded' => false,
            'error' => $e->getMessage(),
        ];
    }
}

echo json_encode($response, JSON_PRETTY_PRINT);
