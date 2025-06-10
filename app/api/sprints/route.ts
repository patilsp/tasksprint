import { type NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Sprint from "@/models/Sprint"
import type { CreateSprintData } from "@/types/sprint"

export async function GET() {
  try {
    await connectToDB()
    const sprints = await Sprint.find({}).sort({ createdAt: -1 })

    // Convert MongoDB documents to plain objects
    const plainSprints = sprints.map((sprint) => ({
      id: sprint._id.toString(),
      name: sprint.name,
      description: sprint.description,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      progress: sprint.progress,
      tasks: sprint.tasks,
      completedTasks: sprint.completedTasks,
      teamMembers: sprint.teamMembers,
      priority: sprint.priority,
    }))

    return NextResponse.json(plainSprints)
  } catch (error) {
    console.error("Error fetching sprints:", error)
    return NextResponse.json({ error: "Failed to fetch sprints" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB()
    const data: CreateSprintData = await request.json()

    // Validate required fields
    if (!data.name || !data.startDate || !data.endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newSprint = new Sprint(data)
    await newSprint.save()

    // Convert to plain object
    const plainSprint = {
      id: newSprint._id.toString(),
      name: newSprint.name,
      description: newSprint.description,
      status: newSprint.status,
      startDate: newSprint.startDate,
      endDate: newSprint.endDate,
      progress: newSprint.progress,
      tasks: newSprint.tasks,
      completedTasks: newSprint.completedTasks,
      teamMembers: newSprint.teamMembers,
      priority: newSprint.priority,
    }

    return NextResponse.json(plainSprint, { status: 201 })
  } catch (error) {
    console.error("Error creating sprint:", error)
    return NextResponse.json({ error: "Failed to create sprint" }, { status: 500 })
  }
}
