import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Sprint from "@/models/Sprint"
import mongoose from "mongoose"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    const id = params.id

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 })
    }

    const sprint = await Sprint.findById(id)
    if (!sprint) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 })
    }

    // Convert to plain object
    const plainSprint = {
      id: sprint._id.toString(),
      name: sprint.name,
      description: sprint.description,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      progress: sprint.progress,
      priority: sprint.priority,
      sprintId: sprint._id.toString(),
    }

    return NextResponse.json(plainSprint)
  } catch (error) {
    console.error("Error fetching sprint:", error)
    return NextResponse.json({ error: "Failed to fetch sprint" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    const id = params.id
    const data = await request.json()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 })
    }

    const updatedSprint = await Sprint.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    )

    if (!updatedSprint) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 })
    }

    // Convert to plain object
    const plainSprint = {
      id: updatedSprint._id.toString(),
      name: updatedSprint.name,
      description: updatedSprint.description,
      status: updatedSprint.status,
      startDate: updatedSprint.startDate,
      endDate: updatedSprint.endDate,
      progress: updatedSprint.progress,
      priority: updatedSprint.priority,
      sprintId: updatedSprint.sprintId.toString(),
    }

    return NextResponse.json(plainSprint)
  } catch (error) {
    console.error("Error updating sprint:", error)
    return NextResponse.json({ error: "Failed to update sprint" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    const id = params.id

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 })
    }

    const deletedSprint = await Sprint.findByIdAndDelete(id)
    if (!deletedSprint) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Sprint deleted successfully" })
  } catch (error) {
    console.error("Error deleting sprint:", error)
    return NextResponse.json({ error: "Failed to delete sprint" }, { status: 500 })
  }
}
