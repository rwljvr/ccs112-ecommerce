// src/pages/ProductTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const ProductTable = ({ products }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No products added yet.</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
