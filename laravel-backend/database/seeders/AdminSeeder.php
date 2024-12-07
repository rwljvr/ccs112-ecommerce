<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Check if the admin user already exists
        if (!User::where('email', 'admin')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]);
        }
    }
}
