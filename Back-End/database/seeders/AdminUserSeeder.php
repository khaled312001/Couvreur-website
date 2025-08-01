<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@bnbuilding.fr',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'phone' => '+33 1 23 45 67 89',
            'address' => '123 Rue de la Construction, 75001 Paris, France',
        ]);

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@bnbuilding.fr');
        $this->command->info('Password: admin123');
    }
}
