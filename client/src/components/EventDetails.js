import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './styles.css';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/events/${id}/rsvp`, {
        name: rsvpName,
        email: rsvpEmail,
        rsvp: rsvpStatus,
      });
      setMessage('RSVP submitted successfully!');
      setEvent(response.data.event); // Update event data with new RSVP
      setRsvpName('');
      setRsvpEmail('');
      setRsvpStatus('');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setMessage('Failed to submit RSVP. Please try again.');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{event.name}</h1>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Created By:</strong> {event.createdBy}</p>
      
      <h2>Guests</h2>
      <div className="guest-list">
        {Array.isArray(event.guests) && event.guests.length > 0 ? (
          event.guests.map((guest, index) => (
            <div className="guest-card" key={index}>
              <p><strong>Name:</strong> {guest.name}</p>
              <p><strong>RSVP:</strong> {guest.rsvp}</p>
            </div>
          ))
        ) : (
          <p>No guests have RSVP'd yet.</p>
        )}
      </div>

      <h2>RSVP</h2>
      <form onSubmit={handleRsvpSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={rsvpName}
          onChange={(e) => setRsvpName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={rsvpEmail}
          onChange={(e) => setRsvpEmail(e.target.value)}
          required
        />
        <select
          value={rsvpStatus}
          onChange={(e) => setRsvpStatus(e.target.value)}
          required
        >
          <option value="">Select RSVP Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button type="submit">Submit RSVP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EventDetails;