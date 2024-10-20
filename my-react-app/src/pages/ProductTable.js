<<<<<<< HEAD
import React, { useState } from 'react';
import { Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';

const ProductTable = ({ products, onEditProduct, onDeleteProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const foundProduct = products.find(
      (product) => product.barcode === searchQuery
    );

    if (foundProduct) {
      setSearchResult(foundProduct);
      setShowAlert(false);
    } else {
      setSearchResult(null);
      setShowAlert(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    setShowAlert(false);
  };

  return (
    <div>
      <h2 className="mb-4">Product List</h2>

      <Form onSubmit={handleSearch} className="mb-3">
        <Row>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by barcode"
            />
          </Col>
          <Col sm={3}>
            <Button type="submit" variant="primary" className="me-2">
              Search
            </Button>
            <Button variant="secondary" onClick={handleClearSearch}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Product with barcode "{searchQuery}" does not exist.
        </Alert>
      )}

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResult ? (
            <tr>
              <td>{searchResult.barcode}</td>
              <td>{searchResult.description}</td>
              <td>₱{searchResult.price}</td>
              <td>{searchResult.quantity}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => onEditProduct(products.indexOf(searchResult))}
                  className="me-2"
=======
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductTable = ({ products = [], onEditProduct, onDeleteProduct }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Barcode</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th> {/* Added column for Edit/Delete actions */}
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={index}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEditProduct(index)}
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
<<<<<<< HEAD
                  onClick={() => onDeleteProduct(products.indexOf(searchResult))}
=======
                  size="sm"
                  onClick={() => onDeleteProduct(index)}
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d
                >
                  Delete
                </Button>
              </td>
            </tr>
<<<<<<< HEAD
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>₱{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => onEditProduct(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteProduct(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
=======
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No products available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
>>>>>>> 2c329f66792233e86de7d138a051a6465d810b3d
  );
};

export default ProductTable;