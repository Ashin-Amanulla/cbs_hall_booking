import { create } from "zustand";

export const useBookingsStore = create((set) => ({
  bookings: [],
  selectedBooking: null,

  setBookings: (bookings) => set({ bookings }),

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),

  updateBooking: (bookingId, updates) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, ...updates } : b
      ),
    })),

  selectBooking: (booking) => set({ selectedBooking: booking }),

  removeBooking: (bookingId) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== bookingId),
    })),
}));
