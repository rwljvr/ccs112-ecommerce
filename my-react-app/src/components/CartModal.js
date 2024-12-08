import React, { useState } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const CartModal = ({ show, onClose }) => {
  const { cart = [], loading, removeFromCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false); // For confirmation modal
  const [selectedItem, setSelectedItem] = useState(null); // Track the item to remove
  const [removingItemId, setRemovingItemId] = useState(null); // Track the id of the item being removed
  const [showNoItemsModal, setShowNoItemsModal] = useState(false); // Track the "No items" modal state
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  // Show confirmation modal and set the selected item to remove
  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setShowConfirmModal(true);
  };

  // Handle confirmed removal
  const handleConfirmRemove = () => {
    if (selectedItem) {
      setRemovingItemId(selectedItem.id); // Set the id of the item being removed
      removeFromCart(selectedItem.id)
        .then(() => {
          setShowConfirmModal(false); // Close confirmation modal
          setSelectedItem(null); // Clear selected item
          setRemovingItemId(null); // Reset removing item id
        })
        .catch((error) => {
          console.error('Error removing item:', error);
          setRemovingItemId(null); // Reset removing item id in case of error
        });
    }
  };

  // Handle checkout button click (check for empty cart)
  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      setShowNoItemsModal(true); // Show "No items" modal if the cart is empty
    } else {
      navigate('/checkout'); // Use navigate to go to checkout page
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title>{item.description}</Card.Title>
                        <Card.Text>Quantity: {item.pivot ? item.pivot.quantity : 'N/A'}</Card.Text>
                        <Card.Text>₱{item.price} per item</Card.Text>
                        <Card.Text>
                          <strong>Total: ₱{calculateItemTotal(item.price, item.pivot ? item.pivot.quantity : 1)}</strong>
                        </Card.Text>
                      </Col>
                      <Col md={4} className="d-flex justify-content-center align-items-center">
                        {removingItemId === item.id ? (
                          <span>Removing...</span> // Show "Removing..." text while the item is being removed
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveClick(item)}
                            disabled={removingItemId === item.id} // Disable button while removing
                          >
                            Remove
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckoutClick}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove{' '}
          <strong>{selectedItem?.description}</strong> from the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* "No Items Yet" Modal */}
      <Modal show={showNoItemsModal} onHide={() => setShowNoItemsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No Items in Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your cart is empty. Please add items before proceeding to checkout.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoItemsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;
