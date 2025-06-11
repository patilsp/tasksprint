import { create } from "zustand"
import type { Project, CreateProjectData } from "@/types/project"

interface ProjectStore {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
  error: string | null

  // Actions
  fetchProjects: (sprintId?: string) => Promise<void>
  fetchProject: (id: string) => Promise<void>
  createProject: (data: CreateProjectData) => Promise<void>
  updateProject: (id: string, data: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  clearError: () => void
  clearCurrentProject: () => void
  clearProjects: () => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: null,

  fetchProjects: async (sprintId?: string) => {
    set({ loading: true, error: null })
    try {
      const url = sprintId ? `/api/projects?sprintId=${sprintId}` : "/api/projects"
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch projects")
      const projects = await response.json()
      set({ projects, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchProject: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/projects/${id}`)
      if (!response.ok) throw new Error("Failed to fetch project")
      const project = await response.json()
      set({ currentProject: project, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createProject: async (data: CreateProjectData) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create project")
      const newProject = await response.json()
      set((state) => ({
        projects: [newProject, ...state.projects],
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  updateProject: async (id: string, data: Partial<Project>) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update project")
      const updatedProject = await response.json()
      set((state) => ({
        projects: state.projects.map((project) => (project.id === id ? updatedProject : project)),
        currentProject: state.currentProject?.id === id ? updatedProject : state.currentProject,
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  deleteProject: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete project")
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentProject: () => set({ currentProject: null }),
  clearProjects: () => set({ projects: [] }),
}))
