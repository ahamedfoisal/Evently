import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './styles.css'; // Ensure you have styles.css for custom styles

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password, role: 'manager' });
      setMessage('Login successful!');

      // Redirect to manager dashboard
      window.location.href = '/manager-dashboard';
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome to Eventify</h1>
        <p>Manage your events with ease.</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Manager Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>

      <div className="login-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/signup?role=manager">Sign up here</Link>.
        </p>
        <p>
          If you want to browse and RSVP to events,{' '}
          <Link to="/events">click here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;