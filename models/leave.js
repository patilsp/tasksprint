import { Schema, model, models } from 'mongoose';

const LeaveSchema = new Schema({
  employeeName: {
    type: String,
    required: [true, 'Employee name is required.'],
  },
  leaveType: {
    type: String,
    required: [true, 'Leave type is required.'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required.'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required.'],
  },
  days: {
    type: Number,
    required: [true, 'Days are required.'],
  },
  reason: {
    type: String,
    required: [true, 'Leave reason is required.'],
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

const Leave = models.Leave || model('Leave', LeaveSchema);

export default Leave;
