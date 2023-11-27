import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAppStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        transactions: [],
        isFilterOpen: false,
        loader: false,
        setLoader: (value: boolean) => set({ loader: value }),
        setIsFilterOpen: (value: boolean) => set({ isFilterOpen: value }),
        setTransactions: (value: {}) => set({ transactions: value }),
      }),
      { name: "AppStore" },
    ),
  ),
);
