<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

echo "Checking blog_posts table...\n";

// Check if table exists
if (!Schema::hasTable('blog_posts')) {
    echo "ERROR: blog_posts table does not exist!\n";
    exit(1);
}

// Check if readTime column exists
if (Schema::hasColumn('blog_posts', 'readTime')) {
    echo "✓ readTime column already exists in blog_posts table.\n";
    
    // Check column definition
    $columns = DB::select("DESCRIBE blog_posts");
    foreach ($columns as $column) {
        if ($column->Field === 'readTime') {
            echo "  Column definition: {$column->Type}, Null: {$column->Null}, Default: " . ($column->Default ?? 'NULL') . "\n";
        }
    }
} else {
    echo "✗ readTime column does NOT exist. Adding it...\n";
    
    try {
        DB::statement("ALTER TABLE blog_posts ADD COLUMN readTime VARCHAR(255) NULL AFTER published_at");
        echo "✓ readTime column added successfully!\n";
    } catch (\Exception $e) {
        echo "ERROR adding readTime column: " . $e->getMessage() . "\n";
        exit(1);
    }
}

echo "\nDone!\n";

