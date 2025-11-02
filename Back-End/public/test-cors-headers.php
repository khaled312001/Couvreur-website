<?php
/**
 * Simple CORS Test File
 * Upload to: public/test-cors-headers.php
 * Access: https://api.bnbatiment.com/test-cors-headers.php
 */

// CORS Headers - Handle preflight requests FIRST
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
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

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $allowedOrigin = null;
    if ($origin && in_array($origin, $allowedOrigins)) {
        $allowedOrigin = $origin;
    }
    
    if ($allowedOrigin) {
        header('Access-Control-Allow-Origin: ' . $allowedOrigin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
    }
    
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    exit(0);
}

// Regular GET request
$allowedOrigin = null;
if ($origin && in_array($origin, $allowedOrigins)) {
    $allowedOrigin = $origin;
}

if ($allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
}

header('Content-Type: application/json');

echo json_encode([
    'status' => 'success',
    'message' => 'CORS headers are working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'origin' => $origin,
    'allowed_origin' => $allowedOrigin ?? 'not in list',
    'headers_sent' => headers_sent(),
    'server_info' => [
        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
        'HTTP_ORIGIN' => $_SERVER['HTTP_ORIGIN'] ?? 'not set',
        'HTTP_REFERER' => $_SERVER['HTTP_REFERER'] ?? 'not set',
    ]
], JSON_PRETTY_PRINT);

