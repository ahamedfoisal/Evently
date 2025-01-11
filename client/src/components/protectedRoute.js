import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  console.log('ProtectedRoute isAuthenticated:', isAuthenticated); // Log authentication state

  if (isAuthenticated === null) {
    // Render a loading state while authentication is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login?role=manager" />;
}

export default ProtectedRoute;