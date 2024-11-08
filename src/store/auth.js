import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: '',
      refresh: '',
      user: { id: 0, username: '', name: '', user_type: 0 },
      logged: false,

      setToken: (token, refresh) => set({ token, refresh, logged: true }),

      setProfile: (user) => set({ user }),

      logout: () =>
        set({
          token: '',
          refresh: '',
          user: { id: 0, username: '', name: '', user_type: 0 },
          logged: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);