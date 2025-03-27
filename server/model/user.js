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
});

export default mongoose.model("User", UserSchema);