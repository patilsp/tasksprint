import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface AuthState {
  user: null | { email: string }
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await axios.post('/api/login', { email, password })
      set({ user: response.data.user, isLoading: false })
      toast.success('Login Successful')
    } catch (error: any) {
      set({ isLoading: false })
      toast.error(error?.response?.data?.error || 'Login failed')
      throw error
    }
  },
  logout: async () => {
    set({ isLoading: true })
    try {
      await axios.post('/api/logout')
      set({ user: null, isLoading: false })
      toast.success('Logout Successful')
    } catch (error) {
      set({ isLoading: false })
      toast.error('Logout failed')
    }
  },
}))