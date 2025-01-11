import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EventList from './components/EventList';
import ManagerDashboard from './components/ManagerDashboard';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/protectedRoute';
import EventDetails from './components/EventDetails';
import EditEvent from './components/EditEvent';
import api from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with `null` to indicate loading

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        console.log('Auth check response:', response.data.isAuthenticated); // Logs response
        setIsAuthenticated(response.data.isAuthenticated); // Updates the state
      } catch (error) {
        console.error('Auth check error:', error); // Logs errors
        setIsAuthenticated(false); // Fallback to unauthenticated
      }
    };
    checkAuth();
  }, []);

  // Show a loader or placeholder during the authentication check
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Redirect `/` to Manager Dashboard if authenticated, otherwise to Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/manager-dashboard" replace /> : <Login />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<EventList />} />
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;