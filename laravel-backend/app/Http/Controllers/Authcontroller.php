<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Cart;  // Don't forget to import the Cart model
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        // Create a cart for the user automatically
        Cart::create(['user_id' => $user->id]);

        // Create an API token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the token and user info (including role)
        return response()->json([
            'token' => $token,
            'role' => $user->role, // Include the role in the response
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email|max:255|exists:users,email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $data['email'])->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create an API token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the token, role, and user info
        return response()->json([
            'token' => $token,
            'role' => $user->role, // Include the role in the response
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens for the authenticated user
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Logged out successfully']);
    }
}
