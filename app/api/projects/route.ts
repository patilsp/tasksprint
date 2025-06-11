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

export async function POST(request: NextRequest) {
  try {
    await connectToDB()
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.sprintId) {
      return NextResponse.json(
        { error: "Name and sprintId are required" },
        { status: 400 }
      )
    }

    // Create new project
    const newProject = new Project({
      name: data.name,
      description: data.description || "",
      status: data.status || "Not Started",
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || new Date().toISOString(),
      progress: data.progress || 0,
      tasks: data.tasks || 0,
      completedTasks: data.completedTasks || 0,
      assignedMembers: data.assignedMembers || 1,
      priority: data.priority || "Medium",
      sprintId: data.sprintId,
      budget: data.budget || 0,
      technologies: data.technologies || [],
    })

    await newProject.save()

    // Convert to plain object
    const plainProject = {
      id: newProject._id.toString(),
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      progress: newProject.progress,
      tasks: newProject.tasks,
      completedTasks: newProject.completedTasks,
      assignedMembers: newProject.assignedMembers,
      priority: newProject.priority,
      sprintId: newProject.sprintId.toString(),
      budget: newProject.budget,
      technologies: newProject.technologies || [],
    }

    return NextResponse.json(plainProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDB()
    const data = await request.json()
    const { id } = data

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    // Remove id from update data
    const updateData = { ...data }
    delete updateData.id

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

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

export async function DELETE(request: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
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
