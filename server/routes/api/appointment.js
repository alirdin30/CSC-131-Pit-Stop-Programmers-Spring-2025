import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../../model/appointment.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private (only logged in users)
router.post(
  '/api/appointments',
  auth, 
  [
    body('service', 'Service is required').notEmpty(),
    body('date', 'Date is required').isISO8601().toDate(),
    body('time', 'Time is required').notEmpty(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { service, date, time } = req.body;

      // Create new appointment
      const appointment = new Appointment({
        service,
        date,
        time,
        user: req.user.id 
      });

      await appointment.save();

      res.status(201).json({ 
        message: 'Appointment scheduled successfully', 
        appointment 
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/appointments
// @desc    Get all appointments for the logged in user
// @access  Private
router.get('/api/appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
