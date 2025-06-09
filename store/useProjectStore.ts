import { create } from 'zustand';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().optional(),
  status: z.enum(["Not Started", "In Progress", "Completed"]).default("Not Started"),
  assignedTo: z.array(z.string()).optional(),
  sprintId: z.string().optional(),
  budget: z.number().optional().default(0),
  priority: z.enum(["High", "Medium", "Low"]).optional().default("Medium"),
  tags: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof projectSchema>;

interface ProjectState {
  project: Project;
  setProject: (project: Partial<Project>) => void;
  validateProject: () => z.ZodError | null;
  resetProject: () => void;
}

const initialProject: Project = {
  name: '',
  description: '',
  startDate: '',
  dueDate: '',
  status: 'Not Started',
  assignedTo: [],
  sprintId: '',
  budget: 0,
  priority: 'Medium',
  tags: [],
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: initialProject,
  setProject: (newProjectData) => set((state) => ({ project: { ...state.project, ...newProjectData } })),
  validateProject: () => {
    try {
      projectSchema.parse(get().project);
      return null;
    } catch (error) {
      return error as z.ZodError;
    }
  },
  resetProject: () => set({ project: initialProject }),
}));
