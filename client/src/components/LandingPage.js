import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function LandingPage() {
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
      fontFamily: "'Arial', sans-serif",
    },
    heading: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '20px',
    },
    subText: {
      fontSize: '1.2rem',
      color: '#555',
      marginBottom: '30px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    link: {
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Event Planner</h1>
      <p style={styles.subText}>Select your role:</p>
      <div style={styles.buttonContainer}>
        <Link to="/login?role=manager" style={styles.link}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login as Manager
          </button>
        </Link>
        {/* <Link to="/login?role=attendee" style={styles.link}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login as Attendee
          </button>
        </Link> */}
        <Link to="/signup?role=manager" style={styles.link}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Sign Up as Manager
          </button>
        </Link>
        {/* <Link to="/signup?role=attendee" style={styles.link}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Sign Up as Attendee
          </button>
        </Link> */}
      </div>
    </div>
  );
}

export default LandingPage;