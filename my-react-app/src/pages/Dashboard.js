// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Dashboard.css'; // Use the same color scheme as in Login
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  // Add Product Form logic
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <Container className="mt-5">
      <Card className="card">
        <Card.Body>
          <Card.Title className="text-center mb-4 card-title">Dashboard</Card.Title>
          <Row>
            <Col md={6}>
              <AddProduct onAddProduct={handleAddProduct} />
            </Col>
            <Col md={6}>
              <h2>Product List</h2>
              <ProductTable products={products} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

// AddProduct component inside Dashboard
const AddProduct = ({ onAddProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { barcode, description, price, quantity, category };
    onAddProduct(newProduct);

    // Reset form
    setBarcode('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Barcode:</label>
      <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
      
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <button type="submit">Add Product</button>
    </form>
  );
};

// ProductTable component inside Dashboard
const ProductTable = ({ products }) => {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="5">No products added yet.</td>
          </tr>
        ) : (
          products.map((product, index) => (
            <tr key={index}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Dashboard;
