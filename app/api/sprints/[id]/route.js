import { connectToDB } from '@/utils/database';
import Project from '@/models/project';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const project = await Project.findById(params.id);

    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch project', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { name, description, startDate, endDate, status, assignedTo, sprintId } = await req.json();

  try {
    await connectToDB();
    const project = await Project.findById(params.id);

    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.status = status;
    project.assignedTo = assignedTo;
    project.sprintId = sprintId;

    await project.save();
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response('Failed to update project', { status: 500 });
  }
};


export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Project.findByIdAndDelete(params.id);

    return new Response('Project deleted', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete project', { status: 500 });
  }
};
