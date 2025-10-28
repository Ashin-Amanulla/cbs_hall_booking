import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null, // 'super_admin', 'hotel_admin', 'event_manager', 'client'

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
      role: userData.role,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      role: null,
    }),

  updateUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
}));
