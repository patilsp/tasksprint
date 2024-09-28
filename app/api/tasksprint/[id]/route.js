import { connectToDB } from '@/utils/database';
import TaskSprint from '@/models/tasksprint';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // Find task by ID
    const tasksprint = await TaskSprint.findById(params.id);
    if (!tasksprint) {
      return new Response("Task Sprint Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(tasksprint), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response("Internal Server Error", { status: 500 });
  }
};
