<?php

require_once 'vendor/autoload.php';

use App\Models\ChatMessage;
use App\Models\ContactMessage;
use Illuminate\Support\Str;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Testing Chat System...\n";

try {
    // Test creating a chat session
    $sessionId = Str::uuid()->toString();
    
    // Create initial chat message
    $chatMessage = ChatMessage::create([
        'session_id' => $sessionId,
        'sender_type' => 'user',
        'sender_name' => 'Test User',
        'sender_email' => 'test@example.com',
        'message' => 'Bonjour, j\'aimerais un devis pour ma toiture.',
        'status' => 'sent'
    ]);
    
    echo "✓ Chat message created successfully\n";
    
    // Create contact message
    $contactMessage = ContactMessage::create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '07 80 32 64 27',
        'subject' => 'Test - Demande de devis',
        'message' => 'Bonjour, j\'aimerais un devis pour ma toiture.',
        'status' => 'unread',
        'session_id' => $sessionId
    ]);
    
    echo "✓ Contact message created successfully\n";
    
    // Test admin response
    $adminMessage = ChatMessage::create([
        'session_id' => $sessionId,
        'sender_type' => 'admin',
        'sender_name' => 'Admin',
        'sender_email' => 'admin@bnbatiment.com',
        'message' => 'Bonjour ! Merci pour votre demande. Nous vous répondrons dans les plus brefs délais.',
        'status' => 'sent'
    ]);
    
    echo "✓ Admin message created successfully\n";
    
    // Retrieve messages
    $messages = ChatMessage::where('session_id', $sessionId)->orderBy('created_at', 'asc')->get();
    echo "✓ Retrieved " . $messages->count() . " messages for session\n";
    
    // Retrieve sessions
    $sessions = ChatMessage::select('session_id')
        ->selectRaw('MAX(created_at) as last_message_at')
        ->selectRaw('COUNT(*) as message_count')
        ->groupBy('session_id')
        ->orderBy('last_message_at', 'desc')
        ->get();
    
    echo "✓ Retrieved " . $sessions->count() . " chat sessions\n";
    
    echo "\n✅ Chat system test completed successfully!\n";
    echo "Session ID: " . $sessionId . "\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 