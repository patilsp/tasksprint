import { create } from 'zustand'
import { toast } from 'react-hot-toast'

export interface Sprint {
  _id: string
  name: string
  description: string
  startDate: string
  dueDate: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Planning' | 'In Progress' | 'Completed'
  project: string
  tasks: number
  completedTasks: number
  teamMembers: string[]
  progress: number
}

interface SprintState {
  sprints: Sprint[]
  isLoading: boolean
  error: string | null
  fetchSprints: () => Promise<void>
  createSprint: (sprintData: Partial<Sprint>) => Promise<void>
  updateSprint: (id: string, sprintData: Partial<Sprint>) => Promise<void>
  deleteSprint: (id: string) => Promise<void>
}

export const useSprintStore = create<SprintState>((set, get) => ({
  sprints: [],
  isLoading: false,
  error: null,

  fetchSprints: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/sprints')
      if (!response.ok) {
        throw new Error('Failed to fetch sprints')
      }
      const data = await response.json()
      set({ sprints: data, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch sprints', isLoading: false })
      toast.error('Failed to fetch sprints')
    }
  },

  createSprint: async (sprintData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/sprints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sprintData),
      })

      if (!response.ok) {
        throw new Error('Failed to create sprint')
      }

      const newSprint = await response.json()
      set((state) => ({
        sprints: [...state.sprints, newSprint],
        isLoading: false,
      }))
      toast.success('Sprint created successfully!')
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create sprint', isLoading: false })
      toast.error('Failed to create sprint')
      throw error
    }
  },

  updateSprint: async (id, sprintData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/sprints/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sprintData),
      })

      if (!response.ok) {
        throw new Error('Failed to update sprint')
      }

      const updatedSprint = await response.json()
      set((state) => ({
        sprints: state.sprints.map((sprint) =>
          sprint._id === id ? updatedSprint : sprint
        ),
        isLoading: false,
      }))
      toast.success('Sprint updated successfully!')
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update sprint', isLoading: false })
      toast.error('Failed to update sprint')
      throw error
    }
  },

  deleteSprint: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/sprints/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete sprint')
      }

      set((state) => ({
        sprints: state.sprints.filter((sprint) => sprint._id !== id),
        isLoading: false,
      }))
      toast.success('Sprint deleted successfully!')
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete sprint', isLoading: false })
      toast.error('Failed to delete sprint')
      throw error
    }
  },
})) 