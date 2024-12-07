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

  // Fetch products from API endpoint
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data); // Assuming response.data is a list of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart items for the logged-in user
  useEffect(() => {
    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found. User is not authenticated.');
          return;
        }
      
        try {
          const response = await axios.get('http://localhost:8000/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          // Log to inspect the response structure
          console.log('Fetched Cart:', response.data);
      
          // Ensure the cart is an array before setting the state
          setCart(response.data.cart || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };
      
    fetchCart();
  }, []); // Fetch cart once after component mount

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/cart/add',
        { product_id: productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Item added to cart:', response.data);
      setCart(response.data.cart); // Assuming the API response returns the updated cart
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
      const response = await axios.delete(`http://localhost:8000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Item removed from cart:', response.data);
      setCart(response.data.cart); // Assuming the API response returns the updated cart
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, products, addToCart, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
