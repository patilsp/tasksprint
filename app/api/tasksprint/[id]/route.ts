import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import TaskSprint from '@/models/tasksprint'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const sprint = await TaskSprint.findById(params.id)

    if (!sprint) {
      return NextResponse.json(
        { error: 'Sprint not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(sprint)
  } catch (error) {
    console.error('Error fetching sprint:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sprint' },
      { status: 500 }
    )
  }
} 