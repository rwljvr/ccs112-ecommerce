use App\Models\Product;

public function index()
{
    return Product::all();
}

public function store(Request $request)
{
    $product = Product::create($request->all());
    return response()->json($product, 201);
}