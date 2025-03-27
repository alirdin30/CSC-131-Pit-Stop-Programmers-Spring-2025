import express from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import '../../strategies/local-strategy.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post(
  '/api/auth/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  passport.authenticate('local', { session: true }),
  (req, res) => {
    res.status(200).json({ message: 'User logged in successfully', user: req.user });
  }
);

// @route   POST /api/auth/logout
// @desc    Logout a user
// @access  Private
router.post('/api/auth/logout', async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err.message });
      }
      res.status(200).json({ message: 'User logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

// @route   GET /api/auth/status
// @desc    Get login status
// @access  Private
router.get('/api/auth/status', (req, res) => {
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.status(200).json({ message: 'User is logged in', user: req.user }) : res.status(401).json({ message: 'User is not logged in' });
});

export default router;