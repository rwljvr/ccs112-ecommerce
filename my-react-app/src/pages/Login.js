import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const DEFAULT_ADMIN_EMAIL = 'admin';
  const DEFAULT_ADMIN_PASSWORD = 'password';

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('role');
    if (isAuthenticated && userRole) {
      if (userRole === 'admin') {
        navigate('/dashboard');
      } else if (userRole === 'user') {
        navigate('/cart');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading to true

    // Check for default admin credentials before making API call
    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      localStorage.setItem('token', 'default-admin-token'); // Use a placeholder token or real token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', 'admin');
      
      console.log('Default admin login successful, redirecting to dashboard.');
      navigate('/dashboard');
      setLoading(false); // Stop loading
      return; // Skip the API call and proceed with admin login
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      console.log('Response data:', response.data);

      // Handle successful login
      localStorage.setItem('token', response.data.token); // Save the token here
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', response.data.user.role);

      if (response.data.user.role === 'admin') {
        navigate('/dashboard');
      } else if (response.data.user.role === 'user') {
        navigate('/cart');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
      console.error('Login error:', err.message);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center container">
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Card className="card">
            <Card.Body>
              <Card.Title className="text-center mb-4 card-title">Login</Card.Title>
              {error && (
                <Alert variant="danger" className="alert-custom">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show Password"
                    className="mt-2"
                    onChange={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-custom"
                  disabled={loading}
                >
                  {loading ? 'Logging In...' : 'Login'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span className="small-text">Don't have an account?</span>{' '}
                <Link to="/register" className="text-primary">
                  Create Account
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
