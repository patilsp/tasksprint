import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  dueDate: z.date(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Low'),
  projectId: z.string(),
  assignedTo: z.string(),
  // status: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
