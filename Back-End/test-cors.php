<?php
/**
 * CORS Test Script
 * Run this from terminal: php test-cors.php
 * Or upload to server and access via browser
 */

echo "=== CORS Configuration Test ===\n\n";

// Check if Laravel files exist
$files_to_check = [
    'vendor/autoload.php',
    'bootstrap/app.php',
    'routes/api.php',
    'config/cors.php',
    'public/index.php',
];

echo "Checking Laravel files...\n";
foreach ($files_to_check as $file) {
    $exists = file_exists($file);
    echo ($exists ? "✓" : "✗") . " $file\n";
}

echo "\n";

// Check CORS config
if (file_exists('config/cors.php')) {
    echo "Reading CORS config...\n";
    $config = require 'config/cors.php';
    
    echo "Allowed Origins:\n";
    foreach ($config['allowed_origins'] ?? [] as $origin) {
        echo "  - $origin\n";
    }
    
    echo "\nAllowed Origins Patterns:\n";
    foreach ($config['allowed_origins_patterns'] ?? [] as $pattern) {
        echo "  - $pattern\n";
    }
    
    echo "\nPaths: " . implode(', ', $config['paths'] ?? []) . "\n";
    echo "Supports Credentials: " . ($config['supports_credentials'] ?? 'false') . "\n";
}

echo "\n";

// Check routes
if (file_exists('routes/api.php')) {
    echo "Checking API routes file...\n";
    $routes_content = file_get_contents('routes/api.php');
    
    if (strpos($routes_content, 'Route::options') !== false) {
        echo "✓ OPTIONS route handler found\n";
    } else {
        echo "✗ OPTIONS route handler NOT found\n";
    }
    
    if (strpos($routes_content, 'test-cors') !== false) {
        echo "✓ CORS test endpoint found\n";
    }
}

echo "\n";

// Test CORS headers in public/index.php
if (file_exists('public/index.php')) {
    echo "Checking public/index.php...\n";
    $content = file_get_contents('public/index.php');
    
    if (strpos($content, 'Access-Control-Allow-Origin') !== false) {
        echo "✓ CORS headers found in index.php\n";
    } else {
        echo "✗ CORS headers NOT found in index.php\n";
    }
    
    if (strpos($content, 'OPTIONS') !== false && strpos($content, 'REQUEST_METHOD') !== false) {
        echo "✓ OPTIONS preflight handling found\n";
    } else {
        echo "✗ OPTIONS preflight handling NOT found\n";
    }
}

echo "\n=== Test Complete ===\n";
echo "\nTo test the API, run these commands:\n";
echo "curl -H 'Origin: https://www.bnbatiment.com' https://api.bnbatiment.com/api/test-cors\n";
echo "curl -X OPTIONS -H 'Origin: https://www.bnbatiment.com' https://api.bnbatiment.com/api/blog\n";
