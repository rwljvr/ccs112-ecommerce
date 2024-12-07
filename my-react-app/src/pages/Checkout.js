import React, { useState } from 'react';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const [shippingDetails, setShippingDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [success, setSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Simulate checkout process
    console.log('Order Details:', {
      cart,
      shippingDetails,
      paymentMethod,
    });
    clearCart();
    setSuccess(true);
  };

  return (
    <div>
      <h2>Checkout</h2>
      {success ? (
        <p>Order placed successfully! Thank you for your purchase.</p>
      ) : (
        <form onSubmit={handleCheckout}>
          <div>
            <label>
              Shipping Details:
              <textarea
                value={shippingDetails}
                onChange={(e) => setShippingDetails(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Payment Method:
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </label>
          </div>
          <h3>Total: ${cartTotal}</h3>
          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
