// src/pages/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); 
  };

  return (
    <div className="dashboard-container">
      
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰ 
      </button>
      {isSidebarVisible && ( 
        <div className="sidebar">
          <div className="sidebar-header">My E-Commerce Dashboard</div>
          <div className="sidebar-content">
            <button
              className={`sidebar-button ${activeButton === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveButton('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`sidebar-button ${activeButton === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveButton('transactions')}
            >
              Transactions
            </button>
            <button
              className={`sidebar-button ${activeButton === 'products' ? 'active' : ''}`}
              onClick={() => setActiveButton('products')}
            >
              Products
            </button>
            <button
              className={`sidebar-button ${activeButton === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveButton('orders')}
            >
              Orders
            </button>
      
          </div>
        </div>
      )}
      <div className="content">
     
        {activeButton === 'dashboard' && <div>Dashboard Content</div>}
        {activeButton === 'transactions' && <div>Transactions Content</div>}
        {activeButton === 'products' && <div>Products Content</div>}
        {activeButton === 'orders' && <div>Orders Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
