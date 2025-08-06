<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Notification;

echo "Testing Notifications API...\n";

try {
    // Check if notifications table exists and has data
    $count = Notification::count();
    echo "✓ Notifications table exists with $count records\n";
    
    // Get some notifications
    $notifications = Notification::orderBy('created_at', 'desc')->limit(5)->get();
    echo "✓ Retrieved " . $notifications->count() . " notifications\n";
    
    foreach ($notifications as $notification) {
        echo "- {$notification->title}: {$notification->message}\n";
    }
    
    // Check unread count
    $unreadCount = Notification::where('is_read', false)->count();
    echo "✓ Unread notifications: $unreadCount\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 