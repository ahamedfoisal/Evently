import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  const { name, date, time, location, createdBy, guests, checklist } = req.body;
  console.log('Incoming data:', req.body); // Debugging
  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      createdBy,
      guests: guests || [],
      checklist: checklist || [],
    });
    await newEvent.save();
    console.log('Event created:', newEvent); // Debugging
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// POST /events/:id/rsvp
router.post('/:id/rsvp', async (req, res) => {
  const { id } = req.params;
  const { name, email, rsvp } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).send({ message: 'Event not found' });

    // Add guest to the event
    event.guests.push({ name, email, rsvp });
    await event.save();

    res.status(200).send({ message: 'RSVP added successfully', event });
  } catch (error) {
    console.error('Error adding RSVP:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Fetch event details by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event details:', err);
    res.status(500).json({ message: 'Failed to fetch event details' });
  }
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;