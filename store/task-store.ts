import { create } from "zustand"
import type { Task, CreateTaskData } from "@/types/task"

interface TaskStore {
  tasks: Task[]
  currentTask: Task | null
  loading: boolean
  error: string | null

  // Actions
  fetchTasks: (projectId?: string) => Promise<void>
  fetchTask: (id: string) => Promise<void>
  createTask: (data: CreateTaskData) => Promise<void>
  updateTask: (id: string, data: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  clearError: () => void
  clearCurrentTask: () => void
  clearTasks: () => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,

  fetchTasks: async (projectId?: string) => {
    set({ loading: true, error: null })
    try {
      const url = projectId ? `/api/tasks?projectId=${projectId}` : "/api/tasks"
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch tasks")
      const tasks = await response.json()
      set({ tasks, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchTask: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`)
      if (!response.ok) throw new Error("Failed to fetch task")
      const task = await response.json()
      set({ currentTask: task, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createTask: async (data: CreateTaskData) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create task")
      const newTask = await response.json()
      set((state) => ({
        tasks: [newTask, ...state.tasks],
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update task")
      const updatedTask = await response.json()
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        currentTask: state.currentTask?.id === id ? updatedTask : state.currentTask,
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  deleteTask: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete task")
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentTask: () => set({ currentTask: null }),
  clearTasks: () => set({ tasks: [] }),
}))
