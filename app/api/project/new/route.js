import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/project';

export const POST = async (request) => {
  try {
    const { name, description, startDate, dueDate, status, assignedTo, sprintId, budget, priority, tags } = await request.json();

    if (!sprintId || !name || !startDate) {
      return new Response(JSON.stringify({ message: 'Missing required fields: sprintId, name, startDate' }), { status: 400 });
    }

    await connectToDatabase();
    const newProject = new Project({
      name,
      description,
      startDate,
      dueDate,
      status,
      assignedTo,
      sprintId,
      budget,
      priority,
      tags,
    });

    await newProject.save();
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    console.error('Failed to create a new project:', error);
    return new Response("Failed to create a new project", { status: 500 });
  }
};

