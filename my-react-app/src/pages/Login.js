// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';  // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Predefined user credentials
  const adminEmail = 'admin';
  const adminPassword = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered credentials match the predefined ones
    if (email === adminEmail && password === adminPassword) {
      setError(false); // Clear any previous errors
      navigate('/dashboard'); // Redirect to the Dashboard page
    } else {
      setError(true); // Show error alert
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
