import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Project Name is required.'],
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, 'Start Date is required.'],
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  assignedTo: {
    type: String,
  },
  sprintId: {
    type: String,
    ref: 'tasksprint',
  },
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
