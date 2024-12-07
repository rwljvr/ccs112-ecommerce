import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, updateCart, removeFromCart, cartTotal } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>
                  Quantity:{' '}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCart(item.id, parseInt(e.target.value, 10))
                    }
                  />
                </p>
                <p>Total: ${item.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Grand Total: ${cartTotal}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
