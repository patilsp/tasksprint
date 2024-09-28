import { create } from 'zustand';
import { z } from 'zod';

const taskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  assignedTo: z.string().optional(),
  projectId: z.string().optional(),
  status: z.enum(["Pending", "In Progress", "Completed"]),
});

export type Task = z.infer<typeof taskSchema>;

interface TaskState {
  task: Task;
  setTask: (task: Partial<Task>) => void;
  validateTask: () => z.ZodError | null;
  resetTask: () => void;
}

const initialTask: Task = {
  name: '',
  description: '',
  startDate: '',
  dueDate: '',
  priority: 'Medium',
  assignedTo: '',
  projectId: '',
  status: 'Pending',
};

export const useTaskStore = create<TaskState>((set, get) => ({
  task: initialTask,
  setTask: (newTaskData) => set((state) => ({ task: { ...state.task, ...newTaskData } })),
  validateTask: () => {
    try {
      const currentTask = get().task;

      // Custom validation logic
      if (currentTask.assignedTo && !currentTask.dueDate) {
        throw new z.ZodError([{ path: ['dueDate'], message: 'Due date is required if assigned to someone.' }]);
      }

      taskSchema.parse(currentTask);
      return null;
    } catch (error) {
      return error as z.ZodError;
    }
  },
  resetTask: () => set({ task: initialTask }),
}));
