<?php

require_once 'vendor/autoload.php';

use App\Models\Notification;
use App\Models\ContactMessage;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Testing Notifications...\n";

// Check if notifications table exists and has data
$count = Notification::count();
echo "✓ Notifications table exists with $count records\n";

// Get some notifications
$notifications = Notification::orderBy('created_at', 'desc')->limit(5)->get();
echo "✓ Retrieved " . $notifications->count() . " notifications\n";

foreach ($notifications as $notification) {
    echo "- {$notification->title}: {$notification->message} (Read: " . ($notification->is_read ? 'Yes' : 'No') . ")\n";
}

$unreadCount = Notification::where('is_read', false)->count();
echo "✓ Unread notifications: $unreadCount\n";

// Test creating a new notification
echo "\nTesting notification creation...\n";
$testNotification = Notification::create([
    'title' => 'Test Notification',
    'message' => 'This is a test notification',
    'type' => 'info',
    'category' => 'test',
    'is_read' => false
]);

echo "✓ Created test notification with ID: {$testNotification->id}\n";

// Clean up test notification
$testNotification->delete();
echo "✓ Cleaned up test notification\n";

echo "\nTest completed successfully!\n"; 