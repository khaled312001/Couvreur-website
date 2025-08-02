<?php

// Test notifications API endpoint with authentication
$baseUrl = 'http://localhost:8000/api';

echo "Testing Notifications API with Authentication...\n";

// First, login to get token
echo "\n1. Logging in to get token...\n";
$loginData = [
    'email' => 'admin@example.com',
    'password' => 'password'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/auth/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($loginData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Login HTTP Code: $httpCode\n";
$responseData = json_decode($response, true);

if (isset($responseData['token'])) {
    $token = $responseData['token'];
    echo "✓ Login successful, token obtained\n";
    
    // Test GET /admin/notifications with token
    echo "\n2. Testing GET /admin/notifications with auth\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/notifications');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "Notifications HTTP Code: $httpCode\n";
    echo "Response: " . substr($response, 0, 1000) . "\n";
    
    // Test mark as read
    echo "\n3. Testing PUT /admin/notifications/1/read\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/notifications/1/read');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "Mark as read HTTP Code: $httpCode\n";
    echo "Response: " . substr($response, 0, 500) . "\n";
    
} else {
    echo "✗ Login failed\n";
    echo "Response: " . $response . "\n";
}

echo "\nTest completed!\n"; 