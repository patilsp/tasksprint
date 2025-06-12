import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Task from "@/models/Task"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()
    const { id } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 })
    }

    const task = await Task.findById(id)
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    // Convert to plain object
    const plainTask = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      tags: task.tags || [],
      projectId: task.projectId.toString(),
      createdAt: task.createdAt?.toISOString(),
      updatedAt: task.updatedAt?.toISOString(),
    }

    return NextResponse.json(plainTask)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()
    const { id } = params
    const data = await request.json()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 })
    }

    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true })

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    // Convert to plain object
    const plainTask = {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      priority: updatedTask.priority,
      assignedTo: updatedTask.assignedTo,
      dueDate: updatedTask.dueDate,
      estimatedHours: updatedTask.estimatedHours,
      actualHours: updatedTask.actualHours,
      tags: updatedTask.tags || [],
      projectId: updatedTask.projectId.toString(),
      createdAt: updatedTask.createdAt?.toISOString(),
      updatedAt: updatedTask.updatedAt?.toISOString(),
    }

    return NextResponse.json(plainTask)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()
    const { id } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 })
    }

    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
