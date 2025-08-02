<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

echo "Creating chat_messages table...\n";

try {
    // Create chat_messages table
    if (!Schema::hasTable('chat_messages')) {
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
        echo "✓ chat_messages table created successfully\n";
    } else {
        echo "✓ chat_messages table already exists\n";
    }

    // Add session_id to contact_messages table
    if (!Schema::hasColumn('contact_messages', 'session_id')) {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('session_id')->nullable()->after('admin_response');
            $table->index('session_id');
        });
        echo "✓ session_id column added to contact_messages table\n";
    } else {
        echo "✓ session_id column already exists in contact_messages table\n";
    }

    echo "\n✅ Database setup completed successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 