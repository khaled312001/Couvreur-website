<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only change if the column exists and doesn't already have the right definition
        if (Schema::hasColumn('contact_messages', 'status')) {
            Schema::table('contact_messages', function (Blueprint $table) {
                $table->string('status', 20)->default('unread')->change();
            });
        }
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('status')->default('unread')->change();
        });
    }
};
