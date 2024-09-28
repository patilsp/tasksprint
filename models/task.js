// models/Task.ts
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  startDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;