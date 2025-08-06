<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

echo "Fixing chat_messages table...\n";

try {
    // Drop the existing table if it exists
    if (Schema::hasTable('chat_messages')) {
        Schema::dropIfExists('chat_messages');
        echo "✓ Dropped existing chat_messages table\n";
    }

    // Create the table with correct structure
    Schema::create('chat_messages', function (Blueprint $table) {
        $table->id();
        $table->string('session_id')->index();
        $table->string('sender_type');
        $table->string('sender_name');
        $table->string('sender_email');
        $table->text('message');
        $table->string('status')->default('sent');
        $table->timestamp('read_at')->nullable();
        $table->timestamps();
        
        $table->index(['session_id', 'created_at']);
    });
    
    echo "✓ Created chat_messages table with correct structure\n";

    // Ensure session_id column exists in contact_messages
    if (!Schema::hasColumn('contact_messages', 'session_id')) {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('session_id')->nullable()->after('admin_response');
            $table->index('session_id');
        });
        echo "✓ Added session_id column to contact_messages table\n";
    } else {
        echo "✓ session_id column already exists in contact_messages table\n";
    }

    echo "\n✅ Chat table fixed successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 