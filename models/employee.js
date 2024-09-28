import mongoose, { Schema, model, models } from 'mongoose';

const EmployeeSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      optional: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    department: { type: String },
    jobTitle: { type: String },
    salary: { type: Number },
    status: { type: String, enum: ['Active', 'Inactive', 'On Boarding', 'Resigned', 'Retired', 'Terminated'] },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    role: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Employee = models.Employee || model('Employee', EmployeeSchema);

export default Employee;
