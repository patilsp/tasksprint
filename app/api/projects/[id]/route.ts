import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Project from "@/models/Project"

export async function POST(request: NextRequest) {
  try {
    await connectToDB()
    const body = await request.json()

    const project = new Project({
      ...body,
      createdBy: body.createdBy || "user@example.com",
    })

    await project.save()
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
