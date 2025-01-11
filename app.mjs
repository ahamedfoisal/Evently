// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import './config/config.mjs'
import expressSession from 'express-session';
import passport from './config/passportConfig.mjs'; 
import managerRoutes from './routes/managerRoutes.js';





const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', managerRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Serve static files from React
app.use(express.static(path.join(__dirname, './client/build')));

// Define a test route
app.get('/api/hello', (req, res) => {
  res.send("Hello from the server!");
});

app.get('/test-session', (req, res) => {
  if (!req.session) {
    return res.status(500).send('Session is not initialized!');
  }
  req.session.test = 'Session is working';
  res.send('Session test passed!');
});
// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
console.log('Session secret:', process.env.SESSION_SECRET);});