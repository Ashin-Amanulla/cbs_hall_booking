import { create } from "zustand";

export const useVenuesStore = create((set) => ({
  venues: [],
  selectedVenue: null,
  filters: {
    hotel: null,
    type: null,
    date: null,
  },

  setVenues: (venues) => set({ venues }),

  selectVenue: (venue) => set({ selectedVenue: venue }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () =>
    set({
      filters: {
        hotel: null,
        type: null,
        date: null,
      },
    }),
}));
