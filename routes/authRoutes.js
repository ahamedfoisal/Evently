import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Server error during authentication' });
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(400).json({ message: info.message }); // Return specific failure reason
    }

    // Attempt to log in the user
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error in req.logIn:', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

router.get('/check', (req, res) => {

  res.json({ isAuthenticated: req.isAuthenticated(),
              user: req.user 
  });
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});






export default router;