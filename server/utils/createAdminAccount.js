import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';
import connectDB from '../config/db.js';

// Admin account details
const adminEmail = 'admin@pitstop.com';
const adminPassword = 'Admin123!'; // This will be hashed
const adminName = 'Admin User';

/**
 * Creates an admin account in the database if one doesn't already exist
 */
async function createAdminAccount() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to database');

    // Check if admin account already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin account already exists');
      await mongoose.connection.close();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the admin user
    const adminUser = new User({
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      role: 'admin'
    });

    // Save the admin user to the database
    await adminUser.save();
    
    console.log('Admin account created successfully');
    
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error creating admin account:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the function
createAdminAccount();
