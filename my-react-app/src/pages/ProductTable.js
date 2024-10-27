import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import AddProduct from './AddProduct'; // Import AddProduct component

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchBarcode, setSearchBarcode] = useState('');

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

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      alert('Failed to delete product: ' + error.message);
    }
  };

  const handleSearch = () => {
    const product = products.find(p => p.barcode === searchBarcode);
    if (!product) {
      alert('Product not found!');
    } else {
      setProducts([product]);
    }
  };

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
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* AddProduct component below to allow adding products directly */}
      <AddProduct onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ProductTable;
