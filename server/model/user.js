import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String, // Hashed password
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "employee", "admin"],
    default: "customer",
  },
  hourlyPay: {
    type: Number,
    required: function() { return this.role === "employee"; },
    min: 0,
  }
});

export default mongoose.model("User", UserSchema);