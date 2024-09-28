import { create } from "zustand";

interface UserState {
  user: { name: string; email: string } | null;
  loading: boolean;
  error: string | null;
  fetchUserProfile: () => void;
}

export const useProfileStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUserProfile: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/employee/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        set({ user: data.user, loading: false });
      } else {
        set({ error: data.error, loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch profile", loading: false });
    }
  },
}));
