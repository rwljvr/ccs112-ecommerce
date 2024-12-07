import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
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
    setError(false);

    // Check for default admin credentials
    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', 'admin');
      navigate('/dashboard'); 
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/cart');
      }
    } catch (err) {
      setError(true);
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-custom"
                >
                  Login
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
