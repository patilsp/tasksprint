'use server'

import { connectToDB } from '@/utils/database';
import Task from '@/models/task';

export async function getTasks() {
  try {
    await connectToDB();
    const tasks = await Task.find({});
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}

export async function createTask(taskData: {
  title: string;
  description: string;
  status: string;
  priority: string;
  startDate: Date;
  dueDate?: Date;
  assignedTo: string[];
  projectId: string;
}) {
  try {
    await connectToDB();
    const newTask = new Task(taskData);
    await newTask.save();
    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}

export async function updateTask(taskId: string, updatedData: Partial<{
  title: string;
  description: string;
  status: string;
  priority: string;
  startDate: Date;
  dueDate?: Date;
  assignedTo: string[];
  projectId: string;
}>) {
  try {
    await connectToDB();
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectToDB();
    await Task.findByIdAndDelete(taskId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}



// 'use server'

// import { connectToDB } from '@/utils/database';
// import Task from '@/models/Task';
// import Employee from '@/models/Employee';
// import Project from '@/models/Project';

// export async function getEmployees() {
//   try {
//     await connectToDB();
//     const employees = await Employee.find({});
//     return JSON.parse(JSON.stringify(employees));
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     throw new Error('Failed to fetch employees');
//   }
// }

// export async function getProjects() {
//   try {
//     await connectToDB();
//     const projects = await Project.find({});
//     return JSON.parse(JSON.stringify(projects));
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     throw new Error('Failed to fetch projects');
//   }
// }

// // Update createTask and updateTask functions to handle full objects
// export async function createTask(taskData: {
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   startDate: Date;
//   dueDate?: Date;
//   assignedTo: { _id: string, name: string }[];
//   project: { _id: string, name: string };
// }) {
//   try {
//     await connectToDB();
//     const newTask = new Task({
//       ...taskData,
//       assignedTo: taskData.assignedTo.map(employee => employee._id),
//       projectId: taskData.project._id
//     });
//     await newTask.save();
//     return JSON.parse(JSON.stringify(newTask));
//   } catch (error) {
//     console.error('Error creating task:', error);
//     throw new Error('Failed to create task');
//   }
// }

// export async function updateTask(taskId: string, updatedData: Partial<{
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   startDate: Date;
//   dueDate?: Date;
//   assignedTo: { _id: string, name: string }[];
//   project: { _id: string, name: string };
// }>) {
//   try {
//     await connectToDB();
//     const updateObject = { ...updatedData };
//     if (updatedData.assignedTo) {
//       updateObject.assignedTo = updatedData.assignedTo.map(employee => employee._id);
//     }
//     if (updatedData.project) {
//       updateObject.projectId = updatedData.project._id;
//     }
//     const updatedTask = await Task.findByIdAndUpdate(taskId, updateObject, { new: true });
//     return JSON.parse(JSON.stringify(updatedTask));
//   } catch (error) {
//     console.error('Error updating task:', error);
//     throw new Error('Failed to update task');
//   }
// }