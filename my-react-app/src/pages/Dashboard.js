// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import Axios instance
import { Link } from 'react-router-dom'; // Import Link for navigation

import ProductTable from '../components/ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get role from local storage (e.g., admin, user)

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching products!', error);
      });
  }, []);

  const handleOpenModal = (index = null) => {
    setCurrentProductIndex(index);
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setCurrentProductIndex(null); // Reset current product index
  };

  const handleDeleteProduct = (id) => {
    api.delete(`/products/${id}`)
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('isAuthenticated'); // Clear login status
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Clear user role
      navigate('/'); // Navigate to login page
    }
  };

  return (
    <Container className="dashboard-container mt-4">
      <Row>
        <Col xs={12} className="mb-4 d-flex justify-content-between align-items-center">
          <h2>Dashboard</h2>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        <Col xs={12} className="mb-4">
          <Card className="p-3">
            <ProductTable
              products={products}
              onEditProduct={handleOpenModal}
              onDeleteProduct={handleDeleteProduct}
            />
          </Card>
        </Col>

        {/* Show Cart Button Only for Regular Users */}
        {role !== 'admin' && (
          <Col xs={12} className="text-center mb-4">
            <Link to="/cart">
              <Button variant="primary">
                Go to Cart
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
