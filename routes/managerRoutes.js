import express from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Manager Dashboard Route
router.get('/manager-dashboard', ensureAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to the Manager Dashboard' });
});

export default router;