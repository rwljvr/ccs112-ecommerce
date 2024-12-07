import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import ProtectedRoute from './ProtectedRoute';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';  // Import CartProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute role="user"><CartPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
