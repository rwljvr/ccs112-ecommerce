<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d


const AddProduct = ({ onAddProduct, currentProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Load current product data into the form when editing
  useEffect(() => {
    if (currentProduct) {
      setBarcode(currentProduct.barcode);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setQuantity(currentProduct.quantity);
      setCategory(currentProduct.category);
    } else {
      // Reset form when not editing
      setBarcode('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory('');
    }
  }, [currentProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
    const newProduct = { barcode, description, price, quantity };
    onAddProduct(newProduct);

    // Clear form fields after submission
=======

    const newProduct = { barcode, description, price, quantity, category };

    onAddProduct(newProduct);

    // Clear the form after submission
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d
    setBarcode('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="add-product-container">
      <h2 className="mb-4">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="form-label">
            Barcode:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              required
              placeholder="Enter barcode"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="form-label">
            Description:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter product description"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="form-label">
            Price:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="Enter product price"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="form-label">
            Quantity:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="0"
              placeholder="Enter available quantity"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="form-label">
            Category:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              {/* Add more categories as needed */}
            </Form.Control>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" className="me-2 btn-custom">
            {currentProduct ? 'Update Product' : 'Add Product'}
          </Button>
          <Button
            variant="secondary"
            className="btn-custom"
            onClick={() => {
              // Reset form if canceling
              setBarcode('');
              setDescription('');
              setPrice('');
              setQuantity('');
              setCategory('');
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d
    </div>
  );
};

export default AddProduct;
