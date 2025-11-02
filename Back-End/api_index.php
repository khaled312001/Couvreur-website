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
// This file should be in the Back-End root directory
// The path below points to public/index.php in the same Back-End directory
if (file_exists(__DIR__.'/public/index.php')) {
    require __DIR__.'/public/index.php';
} else {
    // Fallback: try different possible paths
    $possiblePaths = [
        __DIR__.'/public/index.php',           // Standard Laravel structure
        dirname(__DIR__).'/Back-End/public/index.php',  // If in subdirectory
        dirname(dirname(__DIR__)).'/Back-End/public/index.php', // Nested
    ];
    
    $found = false;
    foreach ($possiblePaths as $path) {
        if (file_exists($path)) {
            require $path;
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'Laravel entry point not found',
            'searched_paths' => $possiblePaths,
            'current_dir' => __DIR__
        ]);
        exit(1);
    }
}

