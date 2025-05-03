import express from 'express';
import Hours from '../../model/hours.js';
import User from '../../model/user.js';
const router = express.Router();

// Clock In
router.post('/clockin', async (req, res) => {
  try {
    const { employeeId } = req.body;
    // Prevent multiple clock-ins without clock-out
    const existing = await Hours.findOne({ employee: employeeId, clockOut: null });
    if (existing) {
      return res.status(400).json({ message: 'Already clocked in. Please clock out first.' });
    }
    const newHours = new Hours({
      employee: employeeId,
      clockIn: new Date(),
    });
    await newHours.save();
    res.json({ message: 'Clocked in successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clock Out
router.post('/clockout', async (req, res) => {
  try {
    const { employeeId } = req.body;
    const hours = await Hours.findOne({ employee: employeeId, clockOut: null });
    if (!hours) {
      return res.status(400).json({ message: 'No active clock-in found.' });
    }
    hours.clockOut = new Date();
    await hours.save();
    res.json({ message: 'Clocked out successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get hours for an employee
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Hours.find({ employee: employeeId });
    
    // Check if employee is currently clocked in
    const isClockedIn = await Hours.findOne({ employee: employeeId, clockOut: null });
    
    res.json({
      records,
      isClockedIn: !!isClockedIn
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all submitted hours (for admin approval)
router.get('/submitted', async (req, res) => {
  try {
    const hours = await Hours.find().populate('employee');
    res.json({ hours });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve or deny a specific hours entry by id
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'denied'
    if (!['approved', 'denied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await Hours.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: `Hours ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Payroll Summary Endpoint
// Returns: [{ name, email, hourlyPay, totalApprovedHours, totalPayment }]
router.get('/payroll-summary', async (req, res) => {
  try {
    // Get all employees
    const employees = await User.find({ role: 'employee' });
    // Get all approved hours
    const hoursRecords = await Hours.find({ status: 'approved', clockIn: { $ne: null }, clockOut: { $ne: null } });
    // Group hours by employee
    const hoursByEmployee = {};
    hoursRecords.forEach(record => {
      const empId = record.employee.toString();
      if (!hoursByEmployee[empId]) hoursByEmployee[empId] = [];
      hoursByEmployee[empId].push(record);
    });
    // Build payroll summary
    const payroll = employees.map(emp => {
      const empHours = hoursByEmployee[emp._id.toString()] || [];
      // Sum total approved hours (in decimal hours)
      let totalApprovedHours = 0;
      empHours.forEach(h => {
        if (h.clockIn && h.clockOut) {
          const diffMs = new Date(h.clockOut) - new Date(h.clockIn);
          totalApprovedHours += diffMs / (1000 * 60 * 60); // convert ms to hours
        }
      });
      const totalPayment = emp.hourlyPay && totalApprovedHours ? (emp.hourlyPay * totalApprovedHours) : 0;
      return {
        name: emp.name,
        email: emp.email,
        hourlyPay: emp.hourlyPay || 0,
        totalApprovedHours: Number(totalApprovedHours.toFixed(2)),
        totalPayment: Number(totalPayment.toFixed(2)),
      };
    });
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
