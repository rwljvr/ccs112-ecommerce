<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');  // Foreign key to the Cart model
            $table->foreignId('product_id')->constrained()->onDelete('cascade');  // Foreign key to the Product model
            $table->integer('quantity')->default(1);  // Quantity of the product
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cart_items');
    }
}
