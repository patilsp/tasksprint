export interface Task {
  id: string
  title: string
  description: string
  status: "Todo" | "In Progress" | "In Review" | "Done"
  priority: "Low" | "Medium" | "High"
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
  projectId: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateTaskData {
  title: string
  description: string
  status: Task["status"]
  priority: Task["priority"]
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
  projectId: string
}
