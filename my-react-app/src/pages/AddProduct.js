import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap is imported

const AddProduct = ({ onAddProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure price and quantity are numbers
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);

    // Check for valid inputs
    if (isNaN(parsedPrice) || isNaN(parsedQuantity) || parsedPrice <= 0 || parsedQuantity < 0) {
      alert('Please enter valid values for price and quantity.');
      return;
    }

    const newProduct = { barcode, description, price: parsedPrice, quantity: parsedQuantity };
    onAddProduct(newProduct);

    // Clear form fields after submission
    setBarcode('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="barcode" className="form-label">Item Barcode:</label>
          <input
            type="text"
            className="form-control"
            id="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Product Description:</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0.01" // Ensure price is positive
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Available Quantity:</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
