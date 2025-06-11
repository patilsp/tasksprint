import { type NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Task from "@/models/Task"
import type { CreateTaskData } from "@/types/task"

export async function GET(request: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    let query = {}
    if (projectId) {
      query = { projectId }
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

    const newTask = new Task(data)
    await newTask.save()

    // Convert to plain object
    const plainTask = {
      id: newTask._id.toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      estimatedHours: newTask.estimatedHours,
      actualHours: newTask.actualHours,
      tags: newTask.tags || [],
      projectId: newTask.projectId.toString(),
      createdAt: newTask.createdAt?.toISOString(),
      updatedAt: newTask.updatedAt?.toISOString(),
    }

    return NextResponse.json(plainTask, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
