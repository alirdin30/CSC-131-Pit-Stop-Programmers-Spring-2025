import express from 'express';
import HoursSubmitted from '../../model/hoursSubmitted.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  const { userId, hours } = req.body;

  if (!userId || !hours) {
    return res.status(400).json({ error: 'userId and hours are required' });
  }

  try {
    const newSubmission = new HoursSubmitted({ userId, hours });
    const savedSubmission = await newSubmission.save();
    res.status(200).json(savedSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit hours' });
  }
});

router.get('/', async (req, res) => {
  try {
    const hours = await HoursSubmitted.find();
    res.json(hours);
  } catch (error) {
    console.error('Error fetching hours:', error);
    res.status(500).json({ error: 'Failed to fetch submitted hours' });
  }
});

export default router;
