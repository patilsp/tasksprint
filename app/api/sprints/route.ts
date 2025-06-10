import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const sprints = await db.collection('sprints').find({}).toArray()
    return NextResponse.json(sprints)
  } catch (error) {
    console.error('Error fetching sprints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sprints' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const sprintData = await request.json()

    // Validate required fields
    if (!sprintData.name || !sprintData.project) {
      return NextResponse.json(
        { error: 'Name and project are required' },
        { status: 400 }
      )
    }

    // Add default values and timestamps
    const newSprint = {
      ...sprintData,
      tasks: 0,
      completedTasks: 0,
      teamMembers: [],
      progress: 0,
      status: sprintData.status || 'Planning',
      priority: sprintData.priority || 'Medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection('sprints').insertOne(newSprint)
    const createdSprint = await db.collection('sprints').findOne({ _id: result.insertedId })

    return NextResponse.json(createdSprint)
  } catch (error) {
    console.error('Error creating sprint:', error)
    return NextResponse.json(
      { error: 'Failed to create sprint' },
      { status: 500 }
    )
  }
} 