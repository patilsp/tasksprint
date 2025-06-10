import { connectToDB } from "@/utils/database";

import Project from '@/models/project';

export const POST = async (request) => {
  try {
    const { name, description, startDate, dueDate, status, assignedTo, workspaceId, budget, priority, tags } = await request.json();

    // Validate required fields
    if (!workspaceId || !name) {
      return new Response(JSON.stringify({ 
        message: 'Missing required fields: workspaceId, name' 
      }), { status: 400 });
    }

    await connectToDB();

    // Create new project with proper date handling
    const newProject = new Project({
      name,
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      status: status || 'Not Started',
      assignedTo: assignedTo || [],
      workspaceId,
      budget: budget || 0,
      priority: priority || 'Medium',
      tags: tags || [],
    });

    const savedProject = await newProject.save();
    
    return new Response(JSON.stringify(savedProject), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to create a new project:', error);
    return new Response(JSON.stringify({ 
      message: error.message || 'Failed to create a new project' 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

