import React from 'react';
import { useCart } from './CartContext';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>Add to Cart</button>
  );
};
a
export default AddToCartButton;
