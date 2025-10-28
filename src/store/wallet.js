import { create } from "zustand";

export const useWalletStore = create((set) => ({
  balance: 0,
  transactions: [],
  rewards: [],
  streak: 0,

  setBalance: (balance) => set({ balance }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  setRewards: (rewards) => set({ rewards }),

  updateStreak: (streak) => set({ streak }),

  earnPoints: (points, description) =>
    set((state) => ({
      balance: state.balance + points,
      transactions: [
        {
          id: Date.now(),
          type: "earn",
          points,
          description,
          date: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    })),

  redeemPoints: (points, description) =>
    set((state) => ({
      balance: state.balance - points,
      transactions: [
        {
          id: Date.now(),
          type: "redeem",
          points,
          description,
          date: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    })),
}));
