import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from '../api';
import './styles.css'; // Import the CSS file

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        if (Array.isArray(response.data)) {
          setEvents(response.data);
          setFilteredEvents(response.data); // Initialize filteredEvents with all events
        } else {
          console.error('Unexpected API response format:', response.data);
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(searchValue)
      )
    );
  };

  return (
    <div className="container">
      <h2>All Events</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {filteredEvents.length > 0 ? (
        <ul className="event-list">
          {filteredEvents.map((event) => (
            <li key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Event by:</strong> {event.createdBy}</p>
              <p><strong>Total RSVPs:</strong> {Array.isArray(event.guests) ? event.guests.length : 0}</p>
              <Link to={`/events/${event._id}`}>
                <button>View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available or match your search.</p>
      )}
    </div>
  );
}

export default EventList;