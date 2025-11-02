<?php

// CORS Headers - Handle preflight requests FIRST
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

// Redirect to the actual Laravel application
// Note: Path should be relative to where this file is located
// If api_index.php is in root, then Back-End/public/index.php
// If api_index.php is in public_html/api/, then ../Back-End/public/index.php or just public/index.php
require __DIR__.'/public/index.php';

