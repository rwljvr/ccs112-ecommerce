import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProduct = ({ onAddProduct, currentProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // When currentProduct changes (edit mode), set the form fields
  useEffect(() => {
    if (currentProduct) {
      setBarcode(currentProduct.barcode);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setQuantity(currentProduct.quantity);
    }
  }, [currentProduct]);

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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Item Barcode</Form.Label>
        <Form.Control
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Available Quantity</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {currentProduct ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
  );
};

export default AddProduct;
