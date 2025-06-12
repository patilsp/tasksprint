import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: {
      values: ["Not Started", "In Progress", "Completed", "On Hold"],
      message: "Status must be one of: Not Started, In Progress, Completed, On Hold"
    },
    default: "Not Started",
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  tasks: {
    type: Number,
    default: 0,
    min: 0,
  },
  completedTasks: {
    type: Number,
    default: 0,
    min: 0,
  },
  assignedMembers: {
    type: Number,
    default: 1,
    min: 1,
  },
  priority: {
    type: String,
    enum: {
      values: ["Low", "Medium", "High"],
      message: "Priority must be one of: Low, Medium, High"
    },
    default: "Medium",
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
    required: [true, "Sprint ID is required"],
  },
  budget: {
    type: Number,
    min: 0,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
})

// Calculate progress before saving
projectSchema.pre("save", function(next) {
  if (this.tasks > 0) {
    this.progress = Math.round((this.completedTasks / this.tasks) * 100)
  } else {
    this.progress = 0
  }
  next()
})

// Add index for faster queries
projectSchema.index({ sprintId: 1, createdAt: -1 })

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema)

export default Project 