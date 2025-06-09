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
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  sprintId: {
    type: Schema.Types.ObjectId,
    ref: 'tasksprint',
  },
  budget: {
    type: Number,
    default: 0,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  tags: [{
    type: String,
  }],
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
