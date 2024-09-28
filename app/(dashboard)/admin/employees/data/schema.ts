import { z } from "zod"

export const employeesSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  department: z.string(),
  jobTitle: z.string(),
  status: z.string(),
  image: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  role: z.string(),
  salary: z.number(),
})

export type Employee = z.infer<typeof employeesSchema>
