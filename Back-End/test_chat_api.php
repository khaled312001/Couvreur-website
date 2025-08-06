<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Http\Controllers\Api\ChatController;
use Illuminate\Http\Request;

echo "Testing Chat API...\n";

try {
    // Create a mock request
    $request = new Request();
    $request->merge([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '07 80 32 64 27',
        'service' => 'Test Service',
        'message' => 'This is a test message'
    ]);

    // Test the createSession method
    $controller = new ChatController();
    $response = $controller->createSession($request);
    
    echo "✓ Chat session created successfully\n";
    echo "Response: " . json_encode($response->getData()) . "\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 