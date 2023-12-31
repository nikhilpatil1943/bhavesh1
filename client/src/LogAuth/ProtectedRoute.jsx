// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  // Check if user is authenticated (e.g., check for the presence of token)
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        element
      ) : (
        <Navigate to="/signin" /> // Redirect to sign-in page if not authenticated
      )}
    />
  );
};

export default ProtectedRoute;
