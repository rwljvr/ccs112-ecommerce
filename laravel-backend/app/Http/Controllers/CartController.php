<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    // View the current cart
    public function viewCart(Request $request)
    {
        // Get the cart for the authenticated user
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if ($cart) {
            // Return the cart details with associated products
            return response()->json([
                'cart' => $cart->products, // Get products in the cart
            ]);
        }

        return response()->json(['message' => 'Cart not found'], 404);
    }

    // Add a product to the cart
    public function addToCart(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Find the user's cart (create if it doesn't exist)
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

        // Find the product to add
        $product = Product::findOrFail($data['product_id']);

        // Check if the product is already in the cart
        $existingProduct = $cart->products()->where('product_id', $product->id)->first();

        if ($existingProduct) {
            // If it exists, update the quantity
            $cart->products()->updateExistingPivot($product->id, [
                'quantity' => $existingProduct->pivot->quantity + $data['quantity'],
            ]);
        } else {
            // If it doesn't exist, attach the product with the specified quantity
            $cart->products()->attach($product->id, ['quantity' => $data['quantity']]);
        }

        return response()->json(['message' => 'Product added to cart']);
    }

    // Remove a product from the cart
    public function removeFromCart($id, Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // Detach product based on product ID
        $cart->products()->detach($id);

        return response()->json(['message' => 'Product removed from cart']);
    }

    // Clear the cart after checkout
    public function clearCart(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // Detach all products from the cart
        $cart->products()->detach();

        return response()->json(['message' => 'Cart cleared after checkout']);
    }
}
