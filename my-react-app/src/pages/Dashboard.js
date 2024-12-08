import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import Axios instance
import { Link } from 'react-router-dom'; // Import Link for navigation

import ProductTable from '../components/ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility for product deletion
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control modal visibility for logout confirmation
  const [productToDelete, setProductToDelete] = useState(null); // Store the product to be deleted
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
    setShowModal(true); // Show modal for editing or viewing product details
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setCurrentProductIndex(null); // Reset current product index
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id); // Store the product id to be deleted
    setShowModal(false); // Close product modal
    setShowLogoutModal(true); // Show confirmation modal for product deletion
  };

  const confirmDeleteProduct = () => {
    api.delete(`/products/${productToDelete}`)
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== productToDelete);
        setProducts(updatedProducts);
        setShowLogoutModal(false); // Close confirmation modal
        setProductToDelete(null); // Reset the product id
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
        setShowLogoutModal(false); // Close modal even in case of error
      });
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Show confirmation modal for logout
  };

  const confirmLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear login status
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Clear user role
    setShowLogoutModal(false); // Close modal
    navigate('/'); // Navigate to login page
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Close modal without logging out
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

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{productToDelete ? 'Confirm Delete' : 'Confirm Logout'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete
            ? 'Are you sure you want to delete this product from your inventory?'
            : 'Are you sure you want to logout?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={productToDelete ? () => setShowLogoutModal(false) : cancelLogout}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={productToDelete ? confirmDeleteProduct : confirmLogout}
          >
            {productToDelete ? 'Yes, Delete' : 'Yes, Logout'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
