import Task from "@/models/task";  // Import the Task model
import { connectToDB } from "@/utils/database";

// GET task by ID
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // Find task by ID
    const task = await Task.findById(params.id);
    if (!task) return new Response("Task Not Found", { status: 404 });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH (Update task)
export const PATCH = async (request, { params }) => {
  const { name, description, startDate, dueDate, priority } = await request.json();

  try {
    await connectToDB();

    // Find the existing task by ID
    const existingTask = await Task.findById(params.id);

    if (!existingTask) {
      return new Response("Task not found", { status: 404 });
    }

    // Update the task with new data
    existingTask.name = name;
    existingTask.description = description;
    existingTask.startDate = new Date(startDate);
    existingTask.dueDate = new Date(dueDate);
    existingTask.priority = priority;

    await existingTask.save();

    return new Response("Successfully updated the Task", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Task", { status: 500 });
  }
};

// DELETE task by ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the task by ID and remove it
    await Task.findByIdAndRemove(params.id);

    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting task", { status: 500 });
  }
};
