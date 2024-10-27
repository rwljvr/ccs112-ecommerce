import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AddProduct from './AddProduct';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchBarcode, setSearchBarcode] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setOriginalProducts(response.data);
    } catch (error) {
      setError('Error fetching products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        setError('Failed to delete product: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/products/${editProduct.id}`, editProduct);
      setEditModal(false);
      fetchProducts();
      alert('Product updated successfully!');
    } catch (error) {
      setError('Failed to update product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchBarcode(value);

    if (value === '') {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((p) => p.barcode === value);
      setProducts(filteredProducts);
    }
  };

  const handleClearSearch = () => {
    setSearchBarcode('');
    setProducts(originalProducts);
  };

  return (
    <div className="table-container">
      <h3 className="text-center mb-4">Product List</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-3 d-flex justify-content-between">
        <Button variant="primary" onClick={() => setAddModal(true)}>
          Add Product
        </Button>
        <div className="d-flex">
          <Button variant="secondary" className="me-2" onClick={handleClearSearch}>
            Clear Search
          </Button>
          <FormControl
            type="text"
            placeholder="Search by barcode"
            value={searchBarcode}
            onChange={handleSearchChange}
            style={{ width: '30vw' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>₱{product.price}</td>
                <td>{product.quantity}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center">
                    <Button variant="warning" onClick={() => handleEditClick(product)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Product Modal */}
      <Modal show={addModal} onHide={() => setAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
          <Button variant="close" onClick={() => setAddModal(false)} aria-label="Close" />
        </Modal.Header>
        <Modal.Body>
          <AddProduct fetchProducts={fetchProducts} onClose={() => setAddModal(false)} /> {/* Ensure this line is correct */}
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
          <Button variant="close" onClick={() => setEditModal(false)} aria-label="Close" />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={editProduct.barcode || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editProduct.description || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editProduct.price || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editProduct.quantity || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ProductTable;
