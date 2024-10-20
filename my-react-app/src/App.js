// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import AuthTabs from './pages/AuthTabs';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes> {/* Changed from Switch to Routes */}
        <Route path="/" element={<AuthTabs />} /> {/* Use element prop */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Use element prop */}
      </Routes>
    </Router>
  );
}

export default App;
