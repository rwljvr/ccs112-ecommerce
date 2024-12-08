import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products (available products)
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data); // Assuming response.data contains a list of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch cart items
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      setCart([]); // Clear the cart if no token
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.cart || []); // Set cart state
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch both products and cart when the provider mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/cart/add',
        { product_id: productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Item added to cart. Fetching updated cart...');
      await fetchCart(); // Re-fetch the cart to sync state with backend
      await fetchProducts(); // Re-fetch the products to reflect any changes
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Item removed from cart. Fetching updated cart...');
      await fetchCart(); // Re-fetch the cart to sync state with backend
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }
  
    console.log('Clearing cart...'); // Log when cart is being cleared
  
    try {
      // Use DELETE request instead of POST
      await axios.delete(
        'http://localhost:8000/api/cart/clear',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart([]); // Reset the local cart state
      console.log('Cart cleared in backend and locally');
    } catch (error) {
      console.error('Error clearing the cart:', error);
    }
  };
  
  
  

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
