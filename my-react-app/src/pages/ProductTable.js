import React from 'react';
import { Table } from 'react-bootstrap';

const ProductTable = ({ products = [] }) => { // Add a default value for products (empty array)
  return (
    <Table striped bordered hover responsive>
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
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={index}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No products available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ProductTable;
