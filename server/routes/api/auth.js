import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import '../../strategies/local-strategy.js';
import User from '../../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendResetPasswordEmail } from '../../utils/email.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post(
  '/api/auth/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    // Authenticate the user
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
      }

      if (!user) {
        // If authentication fails, return the error message from `info`
        return res.status(401).json({ message: info.message || 'Invalid credentials' });
      }

      // Log the user in
      req.logIn(user, (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Login failed' });
        }

        // Return success response with user details
        return res.status(200).json({ message: 'User logged in successfully', user });
      });
    })
    (req, res, next);
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

// @route   POST /api/auth/forgot-password
// @desc    Send reset password email
// @access  Public
router.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token with user ID and expiration time (1 hour)
    const resetToken = jwt.sign({ id: user._id }, 'pitstopprogrammers', { expiresIn: '1h' }); // 'pitstopprogrammers' will be in process.env.JWT_SECRET

    // Create the reset link
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Send the reset email
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset user password
// @access  Public
router.post(
  '/api/auth/reset-password',
  [
    body('token', 'Reset token is required').notEmpty(),
    body('password', 'Password must be between 6 and 32 characters').isLength({ min: 6, max: 32 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    try {
      // Verify the reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pitstopprogrammers');

      // Find the user by ID extracted from the token
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error.message);
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Reset token has expired' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;