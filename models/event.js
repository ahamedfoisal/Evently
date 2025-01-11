import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  createdBy: { type: String, required: true },
  guests: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      rsvp: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Maybe' },
    },
  ],
  checklist: [
    {
      task: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Event', EventSchema);
