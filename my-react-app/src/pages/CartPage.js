import React, { useState } from 'react';
import { Container, Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartModal from '../components/CartModal';

const CartPage = () => {
  const { cart = [], addToCart, products } = useCart();  // Default to empty array if cart is undefined
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false); // State for showing cart modal
  const navigate = useNavigate();

  // Show the product modal to add products to the cart
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
      addToCart(selectedProduct.id, quantity); // Adding the product to the cart
      setShowProductModal(false);  // Close the modal
    }
  };

  // Cart modal visibility functions
  const handleShowCart = () => setShowCartModal(true);
  const handleCloseCart = () => setShowCartModal(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/'); // Navigate to login page
    }
  };

  return (
    <Container>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Button variant="primary" onClick={handleShowCart}>
          View Cart
        </Button>
      )}

      <h4>Available Products</h4>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>{product.description}</Card.Title>
                <Card.Text>₱{product.price}</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => handleShowProductModal(product)} >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Product Detail Modal */}
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
            <Button variant="secondary" onClick={handleCloseProductModal}>Close</Button>
            <Button variant="primary" onClick={handleAddToCart}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Cart Modal */}
      <CartModal show={showCartModal} onClose={handleCloseCart} cart={cart} />

      {/* Logout Button */}
      <Button variant="danger" onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </Container>
  );
};

export default CartPage;
