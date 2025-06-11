import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Task from "@/models/Task"
import { CreateTaskData } from "@/types/task"
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    let query = {}
    if (projectId) {
      query = { projectId: new mongoose.Types.ObjectId(projectId) }
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 })

    // Convert MongoDB documents to plain objects
    const plainTasks = tasks.map((task) => ({
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
    const data: CreateTaskData = await request.json()

    // Validate required fields
    if (!data.title || !data.projectId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new task with proper data formatting
    const taskData = {
      title: data.title,
      description: data.description || "",
      status: data.status || "Todo",
      priority: data.priority || "Medium",
      assignedTo: data.assignedTo || "",
      dueDate: data.dueDate || "",
      estimatedHours: data.estimatedHours || 0,
      actualHours: data.actualHours || 0,
      tags: data.tags || [],
      projectId: new mongoose.Types.ObjectId(data.projectId),
    }

    const newTask = new Task(taskData)
    const savedTask = await newTask.save()

    // Convert to plain object
    const plainTask = {
      id: savedTask._id.toString(),
      title: savedTask.title,
      description: savedTask.description,
      status: savedTask.status,
      priority: savedTask.priority,
      assignedTo: savedTask.assignedTo,
      dueDate: savedTask.dueDate,
      estimatedHours: savedTask.estimatedHours,
      actualHours: savedTask.actualHours,
      tags: savedTask.tags || [],
      projectId: savedTask.projectId.toString(),
      createdAt: savedTask.createdAt?.toISOString(),
      updatedAt: savedTask.updatedAt?.toISOString(),
    }

    return NextResponse.json(plainTask, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
