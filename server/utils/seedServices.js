import mongoose from 'mongoose';
import Service from '../model/service.js';

const services = [
  {
    name: 'Oil Change',
    price: '$39.99',
    description: "Regular oil changes are essential for maintaining your engine's performance and longevity."
  },
  {
    name: 'Tire Rotation and Balancing',
    price: '$49.99',
    description: 'Ensure even tire wear and optimal vehicle handling with our tire services.'
  },
  {
    name: 'Brake Inspection',
    price: '$29.99',
    description: 'Comprehensive brake system inspection for safety and performance.'
  },
  {
    name: 'Battery Check and Replacement',
    price: '$19.99',
    description: 'Testing and replacement services to keep your vehicle starting reliably.'
  },
  {
    name: 'Fluid Top-Off',
    price: '$9.99',
    description: 'We check and top off all essential fluids for your vehicle.'
  }
];

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pitstop_db');
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log('Seeded services successfully.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding services:', err);
    process.exit(1);
  }
}

seed();
