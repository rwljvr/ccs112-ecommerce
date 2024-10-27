import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ fetchProducts, onClose }) => { // Make sure this part is correct
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      barcode,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Product added successfully!');
        fetchProducts(); // Call the fetchProducts function
        setBarcode('');
        setDescription('');
        setPrice('');
        setQuantity('');
        onClose(); // Close the modal after successful addition
      }
    } catch (error) {
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-product-container bg-white p-0 rounded border-0" style={{ boxShadow: 'none' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Item Barcode:</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Available Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
