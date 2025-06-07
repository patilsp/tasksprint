import TaskSprint from "@/models/tasksprint";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();
    const { userId, name, description, startDate, dueDate, priority, status, project } = await request.json();

    if (!project) {
      return new Response(JSON.stringify({ message: 'Project is required' }), { status: 400 });
    }

    const newTaskSprint = new TaskSprint({
      name,
      description,
      startDate,
      dueDate,
      priority,
      status,
      creator: userId,
      project
    });

    await newTaskSprint.save();
    return new Response(JSON.stringify(newTaskSprint), { status: 201 });
  } catch (error) {
    console.error('Error details:', error.stack);
    return new Response("Failed to create a new Task Sprint", { status: 500 });
  }
};
