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

// Add the route for updating the status of a submission
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status || !['pending', 'approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Valid status is required (pending, approved, or denied)' });
  }
  
  try {
    console.log(`Updating submission ${id} status to ${status}`);
    
    const updatedSubmission = await HoursSubmitted.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    
    if (!updatedSubmission) {
      return res.status(404).json({ error: 'Hours submission not found' });
    }
    
    console.log(`Successfully updated submission: ${updatedSubmission._id}`);
    res.status(200).json(updatedSubmission);
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({ error: 'Failed to update submission status' });
  }
});

export default router;