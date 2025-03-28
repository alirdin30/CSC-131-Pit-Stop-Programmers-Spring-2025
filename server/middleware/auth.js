import jwt from 'jsonwebtoken';
import User from '../model/user.js';

// Middleware to authenticate user using session or JWT
const auth = async (req, res, next) => {
  try {
    // Check if user is logged in via session (primary method)
    if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      // Set user.id for consistency with token auth
      if (!req.user.id && req.user._id) {
        req.user.id = req.user._id;
      }
      return next();
    }

    // Fallback to token-based auth if session auth fails
    const token = req.cookies && req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required. Please log in.' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, 'pitstop'); // Use the same secret as in session config
      
      // Find user by id
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid authentication. Please log in again.' });
      }
      
      // Set user in request object
      req.user = user;
      next();
    } catch (tokenError) {
      console.error('Token verification error:', tokenError.message);
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export default auth;
