<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('services')) {
            Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->text('long_description');
            $table->string('icon');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('duration');
            $table->string('price_range');
            $table->json('features');
            $table->json('sub_services');
            $table->json('materials');
            $table->json('advantages');
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
}; 