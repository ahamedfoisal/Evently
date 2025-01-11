//client/src/components/SignUp.js
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api';

function SignUp() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track signup status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', { name, email, password, role });
      setMessage('Signup successful! You can now log in.');
      setIsSignedUp(true); // Mark signup as successful
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
      setIsSignedUp(false); // Reset signup status if it fails
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up as {role}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}

      {/* Conditionally render the login link */}
      {isSignedUp && (
        <p>
          <Link to={`/login?role=${role}`}>Click here to login</Link>
        </p>
      )}
    </div>
  );
}

export default SignUp;