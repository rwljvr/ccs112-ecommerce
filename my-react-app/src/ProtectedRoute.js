import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role');

  console.log("ProtectedRoute check: ", { isAuthenticated, userRole, requiredRole: role });

  // If the user is already authenticated, redirect based on role
  if (isAuthenticated && role && userRole !== role) {
    console.log('User is authenticated but role does not match, redirecting to home.');
    return <Navigate to="/" />; // Or to an appropriate route
  }

  // Check if user is authenticated and has the correct role
  if (!isAuthenticated) {
    console.log('User is not authenticated, redirecting to login.');
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    console.log(`User does not have the required role. Expected: ${role}, Found: ${userRole}`);
    return <Navigate to="/" />;
  }

  // If authenticated and has the correct role, show the protected content
  return children;
};

export default ProtectedRoute;
