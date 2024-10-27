// AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';


const AddProduct = ({ onAddProduct }) => {
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
        onAddProduct();
        setBarcode('');
        setDescription('');
        setPrice('');
        setQuantity('');
      }
    } catch (error) {
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-product-container">
      <h4 className="add-product-title">Add Product</h4>
      
      <form onSubmit={handleSubmit}>
        <label className="add-product-label">Item Barcode:</label>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          required
          className="add-product-input"
        />
        
        <label className="add-product-label">Product Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="add-product-input"
        />
        
        <label className="add-product-label">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          className="add-product-input"
        />
        
        <label className="add-product-label">Available Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0"
          className="add-product-input"
        />
        
        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
