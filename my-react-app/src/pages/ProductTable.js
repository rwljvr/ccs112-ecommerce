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
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteProduct(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
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
  );
};

export default ProductTable;