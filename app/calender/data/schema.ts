import { z } from "zod"

export const leavesSchema = z.object({
  id: z.string(),
  employeeName: z.string(),
  leaveType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.string(),
  days: z.string(),
  reason: z.string(),
 
})

export type Leave = z.infer<typeof leavesSchema>
