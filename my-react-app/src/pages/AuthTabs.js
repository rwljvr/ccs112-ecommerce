// src/pages/AuthTabs.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import './AuthTabs.css';

function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Container className="auth-container">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <div className="auth-tabs">
            <div
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              LOGIN
            </div>
            <div
              className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              SIGN UP
            </div>
          </div>
          <hr className="tab-divider" />
          <Card className="auth-card">
            <Card.Body>
              {activeTab === 'login' ? <Login /> : <Signup />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthTabs;
