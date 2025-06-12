import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: {
      values: ["Todo", "In Progress", "In Review", "Done"],
      message: "Status must be one of: Todo, In Progress, In Review, Done"
    },
    default: "Todo",
  },
  priority: {
    type: String,
    enum: {
      values: ["Low", "Medium", "High"],
      message: "Priority must be one of: Low, Medium, High"
    },
    default: "Medium",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "Project ID is required"],
  },
  dueDate: {
    type: Date,
    default: null,
  },
  estimatedHours: {
    type: Number,
    default: 0,
  },
  actualHours: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true,
})

// Add index for faster queries
taskSchema.index({ projectId: 1, createdAt: -1 })

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)

export default Task
