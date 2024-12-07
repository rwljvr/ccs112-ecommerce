    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\ProductController;
    use App\Http\Controllers\AuthController; // Note the correct casing for `AuthController`
    use App\Http\Controllers\CartController;  // Ensure the CartController is imported

    // Public routes
    Route::apiResource('products', ProductController::class); // This will provide the usual CRUD routes for products

    // Authentication routes (register, login, logout)
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        // Get the authenticated user (can be used to check user info)
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Cart management routes
        Route::get('/cart', [CartController::class, 'viewCart']); // View the user's cart
        Route::post('/cart/add', [CartController::class, 'addToCart']);

        Route::get('/cart/add', [CartController::class, 'addToCart']);
        Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']); // Remove a product from the cart
    });
