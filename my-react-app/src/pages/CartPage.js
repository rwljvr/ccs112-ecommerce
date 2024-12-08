import React, { useState } from 'react';
import { Container, Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartModal from '../components/CartModal';

const CartPage = () => {
  const { cart = [], addToCart, products } = useCart();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for the logout modal
  const navigate = useNavigate();

  const handleShowProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => setShowProductModal(false);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity <= selectedProduct.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct.id, quantity);
      setShowProductModal(false);
    }
  };

  const handleShowCart = () => setShowCartModal(true);
  const handleCloseCart = () => setShowCartModal(false);

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
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    <Container>
      <h3>Shop</h3>
      <Button variant="primary" onClick={handleShowCart}>
        View Cart
      </Button>
      <Button className="m-2" variant="danger" onClick={handleLogout}>
        Logout
      </Button>
      <h4>Available Products</h4>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>{product.description}</Card.Title>
                <Card.Text>₱{product.price}</Card.Text>
                <Button variant="primary" onClick={() => handleShowProductModal(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProduct && (
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.description}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Price:</strong> ₱{selectedProduct.price}</p>
            <p><strong>Available Stock:</strong> {selectedProduct.quantity}</p>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                min="1"
                max={selectedProduct.quantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <CartModal show={showCartModal} onClose={handleCloseCart} />

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;
