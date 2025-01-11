import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './styles.css';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/auth/check');
        setUser(response.data.user); // Set the logged-in user
      } catch (err) {
        console.error('Error checking user:', err);
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null); // Reset the user state
      setIsAuthenticated(false); // Update the global isAuthenticated state
      navigate('/'); // Redirect to the landing page
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to={isAuthenticated ? "/manager-dashboard" : "/"} className="nav-link">
          Home
        </Link>
        <Link to="/events" className="nav-link">View All Events</Link>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <Link to="/login?role=manager" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;