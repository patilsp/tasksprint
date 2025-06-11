import mongoose from "mongoose"

const sprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sprint name is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["PLANNING", "ACTIVE", "COMPLETED", "CANCELLED"],
    default: "PLANNING",
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
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  }
}, {
  timestamps: true,
})

// Add index for faster queries
sprintSchema.index({ createdAt: -1 })

const Sprint = mongoose.models.Sprint || mongoose.model("Sprint", sprintSchema)

export default Sprint 