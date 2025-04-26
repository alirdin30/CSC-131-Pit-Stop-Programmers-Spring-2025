import mongoose from 'mongoose';

const HoursSubmittedSchema = new mongoose.Schema({
    employeeName: String,
    employeeEmail: String,
    shiftDate: Date,
    clockInTime: Date,
    clockOutTime: Date,
    hoursWorked: Number,
    status: String
});

const HoursSubmitted = mongoose.model('HoursSubmitted', HoursSubmittedSchema);

export default HoursSubmitted;
