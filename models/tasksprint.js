import mongoose, { Schema, model, models } from 'mongoose';

const TaskSprintSchema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    optional: true,
  },
  name: {
    type: String,
    required: [true, 'Sprint name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  dueDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed'],
    default: 'Planning',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required'],
  },
}, { timestamps: true });

export default mongoose.models.TaskSprint || mongoose.model('TaskSprint', TaskSprintSchema);
