<?php
// Quick Test for Hostinger Backend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Test 1: Basic PHP
echo json_encode([
    'status' => 'success',
    'message' => 'PHP is working',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
]);

// Test 2: Check if Laravel files exist
$laravel_files = [
    'bootstrap/app.php',
    'vendor/autoload.php',
    'routes/api.php',
    '.env'
];

$file_status = [];
foreach ($laravel_files as $file) {
    $file_status[$file] = file_exists($file) ? 'exists' : 'missing';
}

echo "\n\nLaravel Files Status:\n";
echo json_encode($file_status, JSON_PRETTY_PRINT);

// Test 3: Simple API endpoints
if (isset($_GET['test'])) {
    switch ($_GET['test']) {
        case 'services':
            echo json_encode([
                'services' => [
                    ['id' => 1, 'name' => 'Test Service 1'],
                    ['id' => 2, 'name' => 'Test Service 2']
                ]
            ]);
            break;
        case 'blog':
            echo json_encode([
                'blog_posts' => [
                    ['id' => 1, 'title' => 'Test Blog 1'],
                    ['id' => 2, 'title' => 'Test Blog 2']
                ]
            ]);
            break;
        default:
            echo json_encode(['error' => 'Invalid test parameter']);
    }
}
?> 