<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function products()
    {
        // Correct many-to-many relationship
        return $this->belongsToMany(Product::class, 'cart_items')->withPivot('quantity');
    }
}
