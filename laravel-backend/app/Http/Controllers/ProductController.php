<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'barcode' => 'required|unique:products',
            'description' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate the incoming request to ensure valid data
        $request->validate([
            'barcode' => 'required|unique:products,barcode,' . $product->id,
            'description' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer', // Quantity to update or decrease
        ]);

        // Check if we need to decrease the stock
        if ($request->quantity < $product->quantity) {
            // Subtract the quantity from the current stock
            $product->quantity -= $request->quantity;
        } else {
            // If the quantity is not a decrease, simply update the product's quantity
            $product->quantity = $request->quantity;
        }

        // Update other fields and save the product
        $product->update($request->all());

        // Return the updated product
        return response()->json(['message' => 'Product stock updated successfully', 'product' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response(null, 204);
    }
}
