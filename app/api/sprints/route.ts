import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Sprint from "@/models/Sprint"
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
  try {
    await connectToDB()
    const sprints = await Sprint.find({}).sort({ createdAt: -1 })

    // Convert to plain objects with proper ID handling
    const plainSprints = sprints.map(sprint => ({
      id: sprint._id.toString(),
      name: sprint.name,
      description: sprint.description,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      progress: sprint.progress,
      priority: sprint.priority,
      createdAt: sprint.createdAt,
      updatedAt: sprint.updatedAt
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
    const data = await request.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const sprint = await Sprint.create({
      name: data.name,
      description: data.description || "",
      status: data.status || "PLANNING",
      startDate: data.startDate || new Date(),
      endDate: data.endDate,
      progress: data.progress || 0,
      priority: data.priority || "MEDIUM"
    })

    // Convert to plain object with proper ID handling
    const plainSprint = {
      id: sprint._id.toString(),
      name: sprint.name,
      description: sprint.description,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      progress: sprint.progress,
      priority: sprint.priority,
      createdAt: sprint.createdAt,
      updatedAt: sprint.updatedAt
    }

    return NextResponse.json(plainSprint, { status: 201 })
  } catch (error) {
    console.error("Error creating sprint:", error)
    return NextResponse.json({ error: "Failed to create sprint" }, { status: 500 })
  }
}
