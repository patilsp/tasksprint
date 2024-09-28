import { z } from "zod"

export const projectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.string(),
  assignedTo: z.string(),
})

export type Project = z.infer<typeof projectsSchema>
