import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Project from "@/models/Project"
import mongoose from "mongoose"

export async function GET(request) {
  try {
    await connectToDB()
    
    // Get sprintId from query parameters
    const { searchParams } = new URL(request.url)
    const sprintId = searchParams.get('sprintId')

    // Build query
    const query = sprintId ? { sprintId } : {}

    // Find projects
    const projects = await Project.find(query)

    // Convert to plain objects
    const plainProjects = projects.map(project => ({
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress,
      tasks: project.tasks,
      completedTasks: project.completedTasks,
      assignedMembers: project.assignedMembers,
      priority: project.priority,
      sprintId: project.sprintId.toString(),
      budget: project.budget,
      technologies: project.technologies || [],
    }))

    return NextResponse.json(plainProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()
    const { id } = params
    const data = await request.json()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const updatedProject = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true })

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Convert to plain object
    const plainProject = {
      id: updatedProject._id.toString(),
      name: updatedProject.name,
      description: updatedProject.description,
      status: updatedProject.status,
      startDate: updatedProject.startDate,
      endDate: updatedProject.endDate,
      progress: updatedProject.progress,
      tasks: updatedProject.tasks,
      completedTasks: updatedProject.completedTasks,
      assignedMembers: updatedProject.assignedMembers,
      priority: updatedProject.priority,
      sprintId: updatedProject.sprintId.toString(),
      budget: updatedProject.budget,
      technologies: updatedProject.technologies || [],
    }

    return NextResponse.json(plainProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB()
    const { id } = params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const deletedProject = await Project.findByIdAndDelete(id)
    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
