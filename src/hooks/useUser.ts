import { UserData } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  clearUserData: () => void;
  lastFetched: number | null;
}

// Single source of truth for user data
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      lastFetched: null,
      setUserData: (data) => set({ userData: data, lastFetched: Date.now() }),
      clearUserData: () => set({ userData: null, lastFetched: null }),
    }),
    {
      name: 'user-storage',
      // Only persist essential user data
      partialize: (state) => ({ userData: state.userData }),
    },
  ),
);
