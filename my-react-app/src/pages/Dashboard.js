import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Import Button
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddProduct = (newProduct) => {
    if (currentProductIndex !== null) {
      // Update the existing product in the list at the given index
      const updatedProducts = products.map((product, index) =>
        index === currentProductIndex ? newProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Add the new product to the list
      setProducts([...products, newProduct]);
    }
    setCurrentProductIndex(null); // Reset after adding/editing
  };

  const handleEditProduct = (index) => {
    // Set the product to be edited (by setting the current product index)
    setCurrentProductIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts); // Remove the selected product
  };

  const handleLogout = () => {
    // Navigate back to the login page when the user clicks "Logout"
    navigate('/');
  };

  return (
    <Container className="dashboard-container">
      <Row>
        <Col xs={12} className="mb-4 d-flex justify-content-between align-items-center">
          <h2>Dashboard</h2>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
        <Col xs={12} className="mb-4">
          <Card className="p-3">
            <AddProduct
              onAddProduct={handleAddProduct}
              currentProduct={products[currentProductIndex]} // Pass the product to edit
            />
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="p-3">
            <ProductTable
              products={products}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
