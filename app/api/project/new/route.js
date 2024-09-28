import { connectToDB } from '@/utils/database';
import Project from '@/models/project';

export const POST = async (request) => {
  const { name, description, startDate, endDate, status, assignedTo, sprintId } = await request.json();

  if (!sprintId) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    await connectToDB();
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      status,
      assignedTo,
      sprintId,
    });

    await newProject.save();
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new project", { status: 500 });
  }
};

