import { UserData } from '@/types';
import { create } from 'zustand';

interface UserState {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  clearUserData: () => void;
  lastFetched: number | null;
  fetchUserData: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  lastFetched: null,
  setUserData: (data) =>
    set({
      userData: data,
      lastFetched: data ? Date.now() : null,
    }),
  fetchUserData: async (uid) => {
    try {
      const response = await fetch(`/api/users/${uid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({
        userData: data,
        lastFetched: Date.now(),
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
  clearUserData: () =>
    set({
      userData: null,
      lastFetched: null,
    }),
}));
