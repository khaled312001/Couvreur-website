<?php

require_once 'vendor/autoload.php';

use App\Models\Notification;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Creating test notification...\n";

// Create a test notification
$notification = Notification::create([
    'title' => 'Test Notification',
    'message' => 'This is a test notification created at ' . now(),
    'type' => 'info',
    'category' => 'test',
    'is_read' => false
]);

echo "✓ Test notification created:\n";
echo "- ID: {$notification->id}\n";
echo "- Title: {$notification->title}\n";
echo "- Message: {$notification->message}\n";
echo "- Type: {$notification->type}\n";
echo "- Category: {$notification->category}\n";
echo "- Is Read: " . ($notification->is_read ? 'Yes' : 'No') . "\n";
echo "- Created: {$notification->created_at}\n";

// Check total notifications
$totalNotifications = Notification::count();
$unreadNotifications = Notification::where('is_read', false)->count();

echo "\nCurrent status:\n";
echo "- Total notifications: $totalNotifications\n";
echo "- Unread notifications: $unreadNotifications\n";

echo "\nTest completed!\n"; 