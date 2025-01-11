import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './styles.css';

function ManagerDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false); // State to toggle Add Event form
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filteredEvents with all events
      } catch (err) {
        console.error('Error fetching events:', err);
        setMessage('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/check');
        setUser(response.data.user);
        console.log('User:', response.data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user information. Please try again later.');
      }
    };
    fetchUser();
  }, []);

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/events', {
        name,
        date,
        time,
        location,
        createdBy: user.name, // Use the logged-in manager's name
      });
      setMessage(response.data.message);
      setEvents([...events, response.data.event]); // Update event list dynamically
      setFilteredEvents([...filteredEvents, response.data.event]); // Update filtered list dynamically
      resetForm();
      setShowAddEvent(false); // Hide the form after successful addition
    } catch (err) {
      console.error('Error adding event:', err);
      setMessage('Failed to add event');
    }
  };

  // Delete an event with confirmation
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await api.delete(`/events/${eventId}`);
        console.log('Delete response:', response.data);
        setMessage(response.data.message);
        setEvents(events.filter((event) => event._id !== eventId));
        setFilteredEvents(filteredEvents.filter((event) => event._id !== eventId)); // Update filtered list
      } catch (err) {
        console.error('Error deleting event:', err);
        setMessage('Failed to delete event');
      }
    }
  };

  // Filter events by "Show My Events"
  const toggleMyEvents = () => {
    setShowMyEvents(!showMyEvents);
    if (!showMyEvents) {
      const managerEvents = events.filter((event) => event.createdBy === user.name);
      setFilteredEvents(managerEvents);
    } else {
      setFilteredEvents(events); // Reset to all events
    }
  };

  // Toggle Add Event form
  const toggleAddEvent = () => {
    setShowAddEvent(!showAddEvent);
  };

  // Search events by name
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const listToSearch = showMyEvents
      ? events.filter((event) => event.createdBy === user.name)
      : events;

    setFilteredEvents(
      listToSearch.filter((event) => event.name.toLowerCase().includes(searchValue))
    );
  };

  // Reset form fields after submission or cancellation
  const resetForm = () => {
    setName('');
    setDate('');
    setTime('');
    setLocation('');
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>
      {message && <p>{message}</p>}

      {/* Add New Event Toggle Button */}
      <button onClick={toggleAddEvent} className="toggle-add-event">
        {showAddEvent ? 'Hide Add Event' : 'Add Event'}
      </button>

      {/* Add Event Form (Conditional Rendering) */}
      {showAddEvent && (
        <form onSubmit={handleAddEvent} className="add-event-form">
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
          <button type="submit">Submit Event</button>
        </form>
      )}

      {/* Show My Events & Search Bar */}
      <div className="filter-container">
        <button onClick={toggleMyEvents}>
          {showMyEvents ? 'Show All Events' : 'Show My Events'}
        </button>
        <input
          type="text"
          placeholder="Search events by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Event List */}
      <h2>All Events</h2>
      <ul className="event-list">
        {filteredEvents.map((event) => (
          <li key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Created By:</strong> {event.createdBy}</p>

            <h4>Guests:</h4>
            <ul>
              {event.guests.map((guest, index) => (
                <li key={index}>
                  {guest.name} ({guest.email}) - RSVP: {guest.rsvp}
                </li>
              ))}
            </ul>

         

            {event.createdBy === user?.name && (
              <div className="event-actions">
                <button onClick={() => navigate(`/edit-event/${event._id}`)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerDashboard;