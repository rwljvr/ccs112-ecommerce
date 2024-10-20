import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import Axios instance
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the Laravel API on component mount
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

  const handleAddProduct = (newProduct) => {
    if (currentProductIndex !== null) {
      // Update existing product
      api.put(`/products/${products[currentProductIndex].id}`, newProduct)
        .then(response => {
          const updatedProducts = products.map((product, index) =>
            index === currentProductIndex ? response.data : product
          );
          setProducts(updatedProducts);
        })
        .catch(error => {
          console.error('There was an error updating the product!', error);
        });
    } else {
      // Add new product
      api.post('/products', newProduct)
        .then(response => {
          setProducts([...products, response.data]);
        })
        .catch(error => {
          console.error('There was an error adding the product!', error);
        });
    }
    handleCloseModal(); // Close the modal
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
            <div className="d-flex justify-content-start mb-3">
              <Button variant="primary" onClick={() => handleOpenModal()}>
                Add Product
              </Button>
            </div>
            <ProductTable
              products={products}
              onEditProduct={handleOpenModal}
              onDeleteProduct={handleDeleteProduct}
            />
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            {currentProductIndex !== null ? 'Edit Product' : 'Add Product'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddProduct
            onAddProduct={handleAddProduct}
            currentProduct={currentProductIndex !== null ? products[currentProductIndex] : null}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
