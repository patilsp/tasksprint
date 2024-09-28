import { Schema, model, models } from 'mongoose';

const AttendanceSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: [true, 'Date is required.'],
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Half Day'],
    required: true
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  remarks: {
    type: String,
  },
});

const Attendance = models.Attendance || model('Attendance', AttendanceSchema);

export default Attendance;
