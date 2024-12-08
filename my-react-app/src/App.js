import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout'; // Import the Checkout page
import ProtectedRoute from './ProtectedRoute';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';  // Import CartProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // Check if the user is already authenticated (e.g., token in localStorage)
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <Router>
        <Routes>
          {/* Redirect to appropriate page if already logged in */}
          <Route
            path="/"
            element={
              token
                ? userRole === 'admin' 
                  ? <Navigate to="/dashboard" /> 
                  : <Navigate to="/cart" />
                : <Login />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute role="user"><CartPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute role="user"><Checkout /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
