<?php

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

// Redirect to the actual Laravel application
require __DIR__.'/Back-End/public/index.php';

