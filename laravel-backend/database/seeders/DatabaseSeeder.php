<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   // database/seeders/DatabaseSeeder.php


   public function run()
{
    $this->call(AdminSeeder::class);
}

/*
public function run()
{
    // Create an admin user
    User::create([
        'name' => 'Admin',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
        'role' => 'admin', 
    ]);

    // Create a regular user
    User::create([
        'name' => 'User',
        'email' => 'user@example.com',
        'password' => bcrypt('password'),
        'role' => 'user', 
    ]);
}
*/
}
