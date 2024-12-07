import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import axios

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate contact number
    if (!/^\d+$/.test(contact)) {
      setError('Contact must only contain numbers.');
      return;
    }

    try {
      // Send registration data using Axios
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        contact
      });

      // Check if the response is successful
      if (response.status === 200) {
        alert('Registration successful! Please log in.');
        navigate('/'); // Navigate to the login page
      } else {
        // Handle failure case if needed
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      // Handle any Axios errors here
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="w-50 p-4">
        <h3 className="text-center">Register</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <Form.Check
              type="checkbox"
              label="Show Password"
              className="mt-2"
              onChange={() => setShowPassword(!showPassword)} // Toggle visibility
              checked={showPassword}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Register</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
