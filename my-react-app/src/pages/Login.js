// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated import
import './LoginSignup.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) { 
    
      navigate('/dashboard'); 
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="auth-btn">
        Login
      </Button>
    </Form>
  );
}

export default Login;
