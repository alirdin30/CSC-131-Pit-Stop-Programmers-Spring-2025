import mongoose from 'mongoose';

const hoursSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
});

export default mongoose.model('Hours', hoursSchema);
