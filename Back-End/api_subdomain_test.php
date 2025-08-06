<?php
// Test file for api.bnbatiment.com subdomain
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Basic info
$info = [
    'status' => 'success',
    'message' => 'API Subdomain is working!',
    'domain' => $_SERVER['HTTP_HOST'] ?? 'unknown',
    'server_ip' => $_SERVER['SERVER_ADDR'] ?? 'unknown',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION
];

// Test API endpoints
if (isset($_GET['test'])) {
    switch ($_GET['test']) {
        case 'services':
            echo json_encode([
                'services' => [
                    ['id' => 1, 'name' => 'Couverture', 'description' => 'Service de couverture'],
                    ['id' => 2, 'name' => 'Zinguerie', 'description' => 'Service de zinguerie'],
                    ['id' => 3, 'name' => 'Entretien', 'description' => 'Service d\'entretien']
                ]
            ]);
            break;
            
        case 'blog':
            echo json_encode([
                'blog_posts' => [
                    ['id' => 1, 'title' => 'Comment choisir sa toiture', 'content' => 'Guide complet...'],
                    ['id' => 2, 'title' => 'Entretien toiture', 'content' => 'Conseils pratiques...']
                ]
            ]);
            break;
            
        case 'testimonials':
            echo json_encode([
                'testimonials' => [
                    ['id' => 1, 'name' => 'Jean Dupont', 'comment' => 'Excellent service!'],
                    ['id' => 2, 'name' => 'Marie Martin', 'comment' => 'Très professionnel']
                ]
            ]);
            break;
            
        default:
            echo json_encode($info);
    }
} else {
    echo json_encode($info);
}
?> 