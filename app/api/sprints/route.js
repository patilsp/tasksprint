import Project from "@/models/project";
import { connectToDB } from "@/utils/database";


export const GET = async (request) => {
  try {
      await connectToDB()

      const projects = await Project.find({})

      return new Response(JSON.stringify(projects), { status: 200 })
  } catch (error) {
      return new Response("Failed to fetch all projects", { status: 500 })
  }
} 


export const PATCH = async (request, { params }) => {
  const { id } = params;
  const { name, description, startDate, endDate, status, assignedTo } = await request.json();

  try {
    await connectToDB();
    const updatedProject = await Project.findByIdAndUpdate(id, { name, description, startDate, endDate, status, assignedTo }, { new: true });
    
    if (!updatedProject) {
      return new Response("Project not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedProject), { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return new Response("Failed to update project", { status: 500 });
  }
};
