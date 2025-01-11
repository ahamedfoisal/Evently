import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './styles.css';

function EditEvent() {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate(); // For navigation after submission
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        const event = response.data;
        setName(event.name);
        setDate(event.date.slice(0, 10)); // Format date for input[type="date"]
        setTime(event.time);
        setLocation(event.location);
      } catch (error) {
        console.error('Error fetching event:', error);
        setMessage('Failed to load event details');
      }
    };
    fetchEvent();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/events/${id}`, { name, date, time, location });
      setMessage('Event updated successfully!');
      navigate('/manager-dashboard'); // Redirect back to dashboard
    } catch (error) {
      console.error('Error updating event:', error);
      setMessage('Failed to update event');
    }
  };

  return (
    <div className="container">
      <h1>Edit Event</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update Event</button>
        <button type="button" onClick={() => navigate('/manager-dashboard')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditEvent;