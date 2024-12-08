import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Table, Modal } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart = [], products, fetchProducts, clearCart } = useCart(); // Use clearCart and updateProductStock functions
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [showOrderProcessedModal, setShowOrderProcessedModal] = useState(false); // For order processed modal
  const [loading, setLoading] = useState(false); // Loading state for checkout process

  // Calculate the total of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * (item.pivot ? item.pivot.quantity : 1);
      return total + itemTotal;
    }, 0);
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }
  
    // Show order processed modal
    setShowOrderProcessedModal(true);
    setLoading(true); // Set loading state to true
  
    try {
      // Log the cart before updating stock
      console.log('Cart before checkout:', cart);
  
      // Update stock based on cart items
      for (const item of cart) {
        const product = products.find((prod) => prod.id === item.id);
        if (product) {
          // Calculate the updated stock quantity
          const quantityToSubtract = item.pivot ? item.pivot.quantity : 1;
          const updatedQuantity = product.quantity - quantityToSubtract;
  
          // Ensure quantity doesn't go below 0
          const finalQuantity = Math.max(0, updatedQuantity);
  
          // Prepare the data to send in the request
          const requestData = {
            barcode: product.barcode || 'Unknown Barcode', // Provide a fallback value if barcode is missing
            description: product.description || 'No description available', // Provide a fallback value if description is missing
            price: product.price || 0, // Provide a fallback value if price is missing
            quantity: finalQuantity, // Update the quantity based on checkout
            created_at: product.created_at || new Date().toISOString(), // Ensure created_at is valid
            updated_at: new Date().toISOString(), // Update the updated_at to current time
          };
  
          // Log the data that will be sent to the server
          console.log('Request Data:', requestData);
  
          // Update the product stock in the backend
          try {
            await axios.put(`http://localhost:8000/api/products/${product.id}`, requestData);
            console.log(`Stock updated for product ID ${product.id}`);
        await fetchProducts(); // Fetch updated products to reflect stock changes
          } catch (error) {
            console.error(`Error updating stock for product ID ${product.id}:`, error.response?.data || error.message);
            // Optionally, show an alert or handle the error UI
          }
        }
      }
  
      // Clear the cart after processing the order
      clearCart(); // Reset cart after order processing
      
      // Log the cart after clearing
      console.log('Cart after checkout (should be empty):', cart);
  
      // Optional: Navigate to the order confirmation page after a short delay
      setTimeout(() => {
        navigate('/cart'); // Redirect after some time
      }, 2000);
  
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while processing your order. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after checkout is done
    }
  };
  
  
  

  // Handle return to cart
  const handleReturnToCart = () => {
    navigate('/cart');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="w-75 p-4">
        <h3 className="text-center">Checkout</h3>

        {/* Cart Items Table */}
        <Table bordered striped>
          <thead>
            <tr>
              <th>Product</th>
              <th>Barcode</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.barcode || 'N/A'}</td> {/* Assuming you have barcode in the item */}
                <td>{item.pivot ? item.pivot.quantity : 1}</td>
                <td>₱{item.price}</td>
                <td>₱{(item.price * (item.pivot ? item.pivot.quantity : 1)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Cart Summary */}
        <div className="mb-3">
          <Row>
            <Col sm={8}>
              <strong>Total:</strong>
            </Col>
            <Col sm={4}>
              <strong>₱{calculateTotal().toFixed(2)}</strong>
            </Col>
          </Row>
        </div>

        {/* Payment Method Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">-- Choose Payment Method --</option>
            <option value="GCash">GCash</option>
            <option value="Card">Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </Form.Control>
        </Form.Group>

        {/* Checkout Button */}
        <Button variant="primary" onClick={handleCheckout} className="w-100 mb-3" disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </Button>

        {/* Return to Cart Button */}
        <Button variant="secondary" onClick={handleReturnToCart} className="w-100">
          Return to Cart
        </Button>
      </Card>

      {/* Order Processed Modal */}
      <Modal show={showOrderProcessedModal} onHide={() => setShowOrderProcessedModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Processed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has been successfully processed. You will be redirected shortly.</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Checkout;
