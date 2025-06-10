import { create } from 'zustand';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  startDate: z.date().optional(),
  dueDate: z.date().optional(),
  status: z.enum(["Not Started", "In Progress", "Completed"]).default("Not Started"),
  assignedTo: z.array(z.string()).default([]),
  workspaceId: z.string().min(1, "Workspace ID is required"),
  budget: z.number().default(0),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  tags: z.array(z.string()).default([]),
  tasks: z.number().default(0),
  progress: z.number().default(0),
});

export type Project = z.infer<typeof projectSchema>;

interface ProjectState {
  project: Project;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  setProject: (project: Partial<Project>) => void;
  validateProject: () => z.ZodError | null;
  resetProject: () => void;
  fetchProjects: () => Promise<void>;
  createProject: (projectData: Project) => Promise<void>;
}

const initialProject: Project = {
  name: '',
  description: '',
  startDate: undefined,
  dueDate: undefined,
  status: 'Not Started',
  assignedTo: [],
  workspaceId: '',
  budget: 0,
  priority: 'Medium',
  tags: [],
  tasks: 0,
  progress: 0,
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: initialProject,
  projects: [],
  isLoading: false,
  error: null,
  setProject: (newProjectData) => set((state) => {
    const updatedProject = { ...state.project, ...newProjectData };
    return { 
      project: updatedProject,
      error: null 
    };
  }),
  validateProject: () => {
    try {
      const project = get().project;
      projectSchema.parse(project);
      return null;
    } catch (error) {
      return error as z.ZodError;
    }
  },
  resetProject: () => set({ project: initialProject, error: null }),
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/project');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      set({ projects: data, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch projects', isLoading: false });
    }
  },
  createProject: async (projectData: Project) => {
    set({ isLoading: true, error: null });
    try {
      // Validate the project data before sending
      const validationResult = projectSchema.safeParse(projectData);
      if (!validationResult.success) {
        throw new Error(validationResult.error.errors[0].message);
      }
      
      const response = await fetch('/api/project/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }
      
      const newProject = await response.json();
      set((state) => ({ 
        projects: [...state.projects, newProject],
        isLoading: false,
        error: null
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));
