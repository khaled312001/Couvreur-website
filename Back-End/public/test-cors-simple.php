<?php
/**
 * Simple CORS Test
 * This file will help debug the CORS issue
 * Access: https://api.bnbatiment.com/test-cors-simple.php
 */

// Force error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: application/json');

// Get origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

// Set CORS headers - ALWAYS
if ($origin && $origin !== '*') {
    // If origin is provided and matches our domain
    $allowedOrigins = ['https://www.bnbatiment.com', 'https://bnbatiment.com'];
    if (in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: false');
    }
} else {
    // No origin header - use wildcard
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: false');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
header('Access-Control-Max-Age: 86400');

// If OPTIONS request, return immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Return info
echo json_encode([
    'status' => 'CORS test successful',
    'origin' => $origin,
    'method' => $_SERVER['REQUEST_METHOD'],
    'timestamp' => date('Y-m-d H:i:s'),
    'headers_set' => true
], JSON_PRETTY_PRINT);
