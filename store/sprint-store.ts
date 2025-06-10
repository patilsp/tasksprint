import { create } from "zustand"
import type { Sprint, CreateSprintData } from "@/types/sprint"

interface SprintStore {
  sprints: Sprint[]
  currentSprint: Sprint | null
  loading: boolean
  error: string | null

  // Actions
  fetchSprints: () => Promise<void>
  fetchSprint: (id: string) => Promise<void>
  createSprint: (data: CreateSprintData) => Promise<void>
  updateSprint: (id: string, data: Partial<Sprint>) => Promise<void>
  deleteSprint: (id: string) => Promise<void>
  clearError: () => void
  clearCurrentSprint: () => void
}

export const useSprintStore = create<SprintStore>((set, get) => ({
  sprints: [],
  currentSprint: null,
  loading: false,
  error: null,

  fetchSprints: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/sprints")
      if (!response.ok) throw new Error("Failed to fetch sprints")
      const sprints = await response.json()
      set({ sprints, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchSprint: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/sprints/${id}`)
      if (!response.ok) throw new Error("Failed to fetch sprint")
      const sprint = await response.json()
      set({ currentSprint: sprint, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createSprint: async (data: CreateSprintData) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/sprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create sprint")
      const newSprint = await response.json()
      set((state) => ({
        sprints: [newSprint, ...state.sprints],
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  updateSprint: async (id: string, data: Partial<Sprint>) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/sprints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update sprint")
      const updatedSprint = await response.json()
      set((state) => ({
        sprints: state.sprints.map((sprint) => (sprint.id === id ? updatedSprint : sprint)),
        currentSprint: state.currentSprint?.id === id ? updatedSprint : state.currentSprint,
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  deleteSprint: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/sprints/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete sprint")
      set((state) => ({
        sprints: state.sprints.filter((sprint) => sprint.id !== id),
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentSprint: () => set({ currentSprint: null }),
}))
