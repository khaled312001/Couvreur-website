<?php

// Test contact form submission and notification creation
$baseUrl = 'http://localhost:8000/api';

echo "Testing Contact Form and Notification Creation...\n";

// Test POST /contact
echo "\n1. Testing POST /contact\n";
$contactData = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '123456789',
    'subject' => 'Test Message',
    'message' => 'This is a test message to check if notifications are created.'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/contact');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contactData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Contact form HTTP Code: $httpCode\n";
echo "Response: " . substr($response, 0, 1000) . "\n";

// Check if notification was created
echo "\n2. Checking if notification was created...\n";
require_once 'vendor/autoload.php';

use App\Models\Notification;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$latestNotification = Notification::orderBy('created_at', 'desc')->first();

if ($latestNotification) {
    echo "✓ Latest notification found:\n";
    echo "- ID: {$latestNotification->id}\n";
    echo "- Title: {$latestNotification->title}\n";
    echo "- Message: {$latestNotification->message}\n";
    echo "- Type: {$latestNotification->type}\n";
    echo "- Category: {$latestNotification->category}\n";
    echo "- Is Read: " . ($latestNotification->is_read ? 'Yes' : 'No') . "\n";
    echo "- Created: {$latestNotification->created_at}\n";
} else {
    echo "✗ No notifications found\n";
}

echo "\nTest completed!\n"; 