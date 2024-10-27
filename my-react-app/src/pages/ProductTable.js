
// ProductTable.js
import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AddProduct from './AddProduct';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchBarcode, setSearchBarcode] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    fetchProducts();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert('Failed to delete product: ' + error.message);
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
    try {
      await axios.put(`http://localhost:8000/api/products/${editProduct.id}`, editProduct);
      setEditModal(false);
      fetchProducts();
      alert('Product updated successfully!');
    } catch (error) {
      alert('Failed to update product: ' + error.message);
    }
  };

  const handleSearch = () => {
    const product = products.find((p) => p.barcode === searchBarcode);
    if (!product) {
      alert('Product not found!');
    } else {
      setProducts([product]);
    }
  };

  useEffect(() => {
    setShowAlert(false); // Close alert whenever the search query changes
  }, [searchQuery]);

  return (
    <div className="table-container">
      <h3 className="text-center mb-4">Product List</h3>

      <div className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by barcode"
          value={searchBarcode}
          onChange={(e) => setSearchBarcode(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleSearch}>
          Search
        </Button>
      </div>

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
              <td>
                <Button variant="secondary" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddProduct onAddProduct={handleAddProduct} />

      {/* Edit Product Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTable;
