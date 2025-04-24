import express from 'express';
import Service from '../../model/service.js';
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Add a new service
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newService = new Service({ name, price, description });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add service' });
  }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price, description } },
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update service' });
  }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete service' });
  }
});

export default router;
