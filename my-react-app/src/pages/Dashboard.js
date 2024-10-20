import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <Container className="dashboard-container">
      <Row>
        <Col xs={12} className="mb-4">
          <Card className="p-3">
            <AddProduct onAddProduct={handleAddProduct} />
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="p-3">
            <ProductTable products={products} /> {/* Pass products array */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
