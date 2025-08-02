<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->index(); // Unique session for each contact form submission
            $table->string('sender_type'); // 'user' or 'admin'
            $table->string('sender_name');
            $table->string('sender_email');
            $table->text('message');
            $table->string('status')->default('sent'); // sent, delivered, read
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            
            $table->index(['session_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
}; 