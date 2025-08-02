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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_phone');
            $table->string('service');
            $table->text('description');
            $table->enum('priority', ['faible', 'normal', 'urgent'])->default('normal');
            $table->enum('status', ['en_attente', 'en_cours', 'planifié', 'terminé', 'annulé'])->default('en_attente');
            $table->decimal('budget', 10, 2);
            $table->date('deadline');
            $table->text('address');
            $table->string('estimated_duration')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
