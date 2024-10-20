import React, { useState } from 'react';

const AddProduct = ({ onAddProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = { barcode, description, price, quantity };
    onAddProduct(newProduct);

    // Clear form fields after submission
    setBarcode('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Item Barcode:
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
        </label>
        <label>
          Product Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Available Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
