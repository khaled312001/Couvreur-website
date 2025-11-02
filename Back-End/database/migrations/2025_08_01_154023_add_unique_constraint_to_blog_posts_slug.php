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
        try {
            Schema::table('blog_posts', function (Blueprint $table) {
                $table->unique('slug');
            });
        } catch (\Exception $e) {
            // Unique constraint already exists, ignore the error
            if (strpos($e->getMessage(), 'Duplicate key name') === false && 
                strpos($e->getMessage(), 'already exists') === false) {
                throw $e;
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropUnique(['slug']);
        });
    }
};
