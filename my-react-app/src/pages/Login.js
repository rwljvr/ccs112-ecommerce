import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const DEFAULT_ADMIN_EMAIL = 'admin';
  const DEFAULT_ADMIN_PASSWORD = 'password';

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading to true
  
    // Log the email and password being sent for debugging
    console.log('Attempting to login with email:', email, 'and password:', password);
    
    // Check for default admin credentials
    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', 'admin');
      console.log('Default admin login successful, redirecting to dashboard.');
      navigate('/dashboard');
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      // Log the response status and response body for debugging
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      // Store the token in localStorage
      localStorage.setItem('token', data.token); // Save the token here
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', data.user.role);
  
      // Log the token after storing it in localStorage
      console.log('Token stored in localStorage:', localStorage.getItem('token'));
  
      // Log the role of the user after login
      console.log('Logged in user role:', data.user.role);
  
      // Log the token to the console every time a successful login happens
      console.log('Logged in successfully, token:', data.token);
  
      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else if (data.user.role === 'user') {
        navigate('/cart');
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err.message); // Log the error message
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
                  Incorrect email or password. Please try again.
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
