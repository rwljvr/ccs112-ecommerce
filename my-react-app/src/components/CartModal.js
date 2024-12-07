import React, { useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Import useCart to access cart state

const CartModal = ({ show, onClose }) => {
  const { cart = [], loading, removeFromCart } = useCart(); // Default cart to an empty array

  useEffect(() => {
    console.log('Cart items:', cart); // Log to see if cart is being fetched correctly
  }, [cart]); // Runs when cart changes

  // Function to calculate total price for each item (price * quantity)
  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : cart.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th> {/* New column for total price per item */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td> {/* Product description */}
                  <td>{item.pivot ? item.pivot.quantity : 'N/A'}</td> {/* Product quantity */}
                  <td>₱{item.price}</td> {/* Price per unit */}
                  <td>₱{calculateItemTotal(item.price, item.pivot ? item.pivot.quantity : 1)}</td> {/* Total price */}
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary">Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
