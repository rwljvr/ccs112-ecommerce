import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Modal, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

// Password strength check function
const checkPasswordStrength = (password) => {
  const lengthCriteria = password.length >= 8;
  const numberCriteria = /[0-9]/.test(password);
  const uppercaseCriteria = /[A-Z]/.test(password);
  const lowercaseCriteria = /[a-z]/.test(password);
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strength = [lengthCriteria, numberCriteria, uppercaseCriteria, lowercaseCriteria, specialCharCriteria].filter(Boolean).length;

  return strength;
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0); // Password strength state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^\d+$/.test(contact)) {
      setError('Contact must only contain numbers.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        contact,
      });

      if (response.status === 200) {
        setShowSuccessModal(true); // Show success modal
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  // Function to handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  // Password strength label
  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Card className="w-50 p-4">
          <h3 className="text-center">Register</h3>
          {error && <p className="text-danger">{error}</p>}
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange} // Handle password change
                placeholder="Enter your password"
                required
              />
              <Form.Check
                type="checkbox"
                label="Show Password"
                className="mt-2"
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              />
              {/* Password strength bar */}
              <div className="mt-2">
              <ProgressBar
  now={(passwordStrength / 4) * 100}
  label={getPasswordStrengthLabel()}
  variant={
    passwordStrength >= 4
      ? 'success'
      : passwordStrength >= 2
      ? 'warning'
      : 'danger'
  }
/>

              </div>
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
            <Button type="submit" variant="primary" className="w-100">
              Register
            </Button>
          </Form>

          {/* Back to Login Button */}
          <div className="text-center mt-3">
            <span className="small-text">Already have an account?</span>{' '}
            <Link to="/" className="text-primary">
              Log In
            </Link>
          </div>
        </Card>
      </Container>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => navigate('/')}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account has been created! Please log in to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
