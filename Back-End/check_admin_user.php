<?php

require_once 'vendor/autoload.php';

use App\Models\User;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Checking admin user...\n";

// Check if admin user exists
$adminUser = User::where('email', 'admin@example.com')->first();

if ($adminUser) {
    echo "✓ Admin user found:\n";
    echo "- ID: {$adminUser->id}\n";
    echo "- Name: {$adminUser->name}\n";
    echo "- Email: {$adminUser->email}\n";
    echo "- Role: {$adminUser->role}\n";
    echo "- Created: {$adminUser->created_at}\n";
} else {
    echo "✗ Admin user not found\n";
    
    // Create admin user
    echo "\nCreating admin user...\n";
    $adminUser = User::create([
        'name' => 'Admin',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
        'role' => 'admin'
    ]);
    
    echo "✓ Admin user created:\n";
    echo "- ID: {$adminUser->id}\n";
    echo "- Name: {$adminUser->name}\n";
    echo "- Email: {$adminUser->email}\n";
    echo "- Role: {$adminUser->role}\n";
}

echo "\nTest completed!\n"; 