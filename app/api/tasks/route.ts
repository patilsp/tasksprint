import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Task from "@/models/Task"
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
  }

    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const tasks = await Task.find({ projectId }).sort({ createdAt: -1 })

    // Convert to plain objects
    const plainTasks = tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      tags: task.tags,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }))

    return NextResponse.json(plainTasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB()
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.projectId) {
      return NextResponse.json(
        { error: "Title and project ID are required" },
        { status: 400 }
      )
    }

    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(data.projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    // Create task with proper data transformation
    const task = await Task.create({
      title: data.title,
      description: data.description || "",
      status: data.status || "Todo",
      priority: data.priority || "Medium",
      projectId: new mongoose.Types.ObjectId(data.projectId),
      dueDate: data.dueDate || null,
      estimatedHours: data.estimatedHours || 0,
      actualHours: data.actualHours || 0,
      tags: data.tags || []
    })

    // Convert to plain object
    const plainTask = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      tags: task.tags,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }

    return NextResponse.json(plainTask, { status: 201 })
  } catch (error: any) {
    console.error("Error creating task:", error)
    if (error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: Object.values(error.errors).map((err: any) => err.message)
      }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
