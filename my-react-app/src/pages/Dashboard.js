// src/pages/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Welcome to the Dashboard</Card.Title>
              <Card.Text>
                You have successfully logged in as an admin.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
