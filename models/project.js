import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
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
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    sprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },
    budget: {
      type: Number,
      min: 0,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Calculate progress before saving
ProjectSchema.pre("save", function (next) {
  if (this.tasks > 0) {
    this.progress = Math.round((this.completedTasks / this.tasks) * 100)
  } else {
    this.progress = 0
  }
  next()
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
