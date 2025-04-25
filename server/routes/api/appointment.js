import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../../model/appointment.js';
import User from '../../model/user.js'; // Add this import to get user email
import auth from '../../middleware/auth.js';
import { sendAppointmentConfirmationEmail } from '../../utils/email.js'; // Import the email function

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
    body('carYear', 'Car year is required').notEmpty(),
    body('carMake', 'Car make is required').notEmpty(),
    body('carModel', 'Car model is required').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { service, date, time, carYear, carMake, carModel } = req.body;

      const appointment = new Appointment({
        service,
        date,
        time,
        carYear,
        carMake,
        carModel,
        user: req.user.id
      });

      await appointment.save();

      const user = await User.findById(req.user.id);
      if (user && user.email) {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        await sendAppointmentConfirmationEmail(
          user.email,
          service,
          formattedDate,
          time
        );
      }

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
    const appointments = await Appointment.find().populate('user', 'name').populate('assignedEmployee', 'name');
    console.log({ appointments, loggedInEmployeeId: req.user.id });
    res.status(200).json({ appointments, loggedInEmployeeId: req.user.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id/assign
// @desc    Assign an employee to an appointment
// @access  Private
router.put('/api/appointments/:id/assign', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.assignedEmployee = req.user.id;
    appointment.status = "assigned";
    await appointment.save();

    res.status(200).json({ message: "Appointment assigned successfully", appointment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update the status of an appointment
// @access  Private
router.put('/api/appointments/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "assigned", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Appointment status updated successfully", appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;