import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface User {
  _id?: string
  name?: string
  email?: string
}

interface UserState {
  user: User | null
  isLoading: boolean
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get("/api/profile")
      set({ user: response.data?.user, isLoading: false })
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch profile")
      set({ user: null, isLoading: false })
    }
  },
  logout: async () => {
    set({ isLoading: true })
    try {
      const { data } = await axios.get("/api/logout")
      toast.success(data.msg)
      set({ user: null, isLoading: false })
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Logout failed")
      set({ isLoading: false })
    }
  }
}))