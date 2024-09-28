import TaskSprint from "@/models/tasksprint";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();
    const { userId, name, description, startDate, dueDate, priority, status } = await request.json();

    const newTaskSprint = new TaskSprint({
      name,
      description,
      startDate,
      dueDate,
      priority,
      status,
      creator: userId
    });

    await newTaskSprint.save();
    return new Response(JSON.stringify(newTaskSprint), { status: 201 });
  } catch (error) {
    console.error('Error details:', error.stack);
    return new Response("Failed to create a new Task Sprint", { status: 500 });
  }
};
