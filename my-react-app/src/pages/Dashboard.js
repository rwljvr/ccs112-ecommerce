import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Open the modal and set the currentProductIndex if editing
  const handleOpenModal = (index = null) => {
    setCurrentProductIndex(index);
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setCurrentProductIndex(null); // Reset current product index
  };

  const handleAddProduct = (newProduct) => {
    if (currentProductIndex !== null) {
      // Update existing product
      const updatedProducts = products.map((product, index) =>
        index === currentProductIndex ? newProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    // Close modal after submission
    handleCloseModal();
  };

  const handleEditProduct = (index) => {
    handleOpenModal(index); // Open modal for editing the selected product
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
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
            {/* Wrapping the button in a div to control its width */}
            <div className="d-flex justify-content-start mb-3">
              <Button variant="primary" onClick={() => handleOpenModal()}>
                Add Product
              </Button>
            </div>
            <ProductTable
              products={products}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </Card>
        </Col>

      </Row>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentProductIndex !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct
            onAddProduct={handleAddProduct}
            currentProduct={products[currentProductIndex]} // Pass current product for editing
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
