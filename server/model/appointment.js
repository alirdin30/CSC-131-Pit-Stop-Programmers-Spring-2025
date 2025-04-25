import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  carYear: {
    type: String,
    required: true,
    trim: true
  },
  carMake: {
    type: String,
    required: true,
    trim: true
  },
  carModel: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Appointment", AppointmentSchema);
