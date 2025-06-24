import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  token: string | null;
}

interface Actions {
  setAuthenticated: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setAuthenticated: (token) => set({ token }),
        logout: () => set({ token: null }),
      }),
      {
        name: 'auth',
      }
    )
  )
);
