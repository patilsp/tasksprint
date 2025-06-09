import { create } from 'zustand';
import { z } from 'zod';

const taskSprintSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Planning", "In Progress", "Completed"]),
  project: z.string().optional(),
  tasks: z.number().default(0),
  completedTasks: z.number().default(0),
  teamMembers: z.array(z.string()).default([])
});

export type TaskSprint = z.infer<typeof taskSprintSchema>;

interface TaskSprintState {
  sprint: TaskSprint;
  setTask: (sprint: Partial<TaskSprint>) => void;
  validateTask: () => z.ZodError | null;
  resetTask: () => void;
}

const initialTaskSprint: TaskSprint = {
  name: '',
  description: '',
  startDate: '',
  dueDate: '',
  priority: 'Medium',
  status: 'Planning',
  tasks: 0,
  completedTasks: 0,
  teamMembers: []
};

export const useTaskSprintStore = create<TaskSprintState>((set, get) => ({
  task: initialTaskSprint,
  setTask: (newTaskData) => set((state) => ({ task: { ...state.task, ...newTaskData } })),
  validateTask: () => {
    try {
      taskSprintSchema.parse(get().task);
      return null;
    } catch (error) {
      return error as z.ZodError;
    }
  },
  resetTask: () => set({ task: initialTaskSprint }),
}));
