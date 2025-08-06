<?php
// CORS Handler - Place this at the top of your index.php or as a separate file

// Get the origin from the request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Define allowed origins
$allowedOrigins = [
    'https://www.bnbatiment.com',
    'https://bnbatiment.com',
    'https://couvreur-website-4kv5.vercel.app'
];

// Check if the origin is allowed
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Default to the main domain if origin is not in the list
    header("Access-Control-Allow-Origin: https://www.bnbatiment.com");
}

// Set other CORS headers
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
?> 