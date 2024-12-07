<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Create example products
        Product::create([
            'barcode' => '1234567890',
            'description' => 'Product 1 Description',
            'price' => 100.00,
            'quantity' => 50,
        ]);

        Product::create([
            'barcode' => '9876543210',
            'description' => 'Product 2 Description',
            'price' => 200.00,
            'quantity' => 30,
        ]);

        Product::create([
            'barcode' => '1122334455',
            'description' => 'Product 3 Description',
            'price' => 150.00,
            'quantity' => 75,
        ]);

        // Add as many products as you need
    }
}
