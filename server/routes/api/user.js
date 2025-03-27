import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../../model/user.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get("/api/user", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post(
  "/api/user",
  [
    body("email", "Please include a valid email").isEmail(),
    body("name", "Name is required").notEmpty(),
    body("password", "Password must be between 6 and 32 characters").isLength({ min: 6, max: 32 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      user = new User({
        email,
        name,
        password: hashedPassword,
        role: "customer", // Default role is customer
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route   PUT /api/users/:id
// @desc    Update user information
// @access  Public
router.put(
  "/api/user/:email",
  [
    body("name", "Name is required").optional().notEmpty(),
    body("password", "Password must be between 6 and 32 characters").optional().isLength({ min: 6, max: 32 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user fields
      if (name) user.name = name;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route   DELETE /api/users/:email
// @desc    Delete a user
// @access  Public
router.delete("/api/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.deleteOne({ email: req.params.email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;