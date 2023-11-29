import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface filterValuesProps {
  to: Date;
  from: Date;
  period: String;
  status: String[];
  type: String[];
  active?: Number;
}

export const useAppStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        transactions: [],
        filteredTransactions: [],
        isFilterOpen: false,
        filterValues: {},
        loader: false,
        setLoader: (value: boolean) => set({ loader: value }),
        setIsFilterOpen: (value: boolean) => set({ isFilterOpen: value }),
        setTransactions: (value: {}) => set({ transactions: value }),
        setFilteredTransactions: (value: {}) =>
          set({ filteredTransactions: value }),
        setFilterValues: (value: any) => set({ filterValues: value }),
      }),
      { name: "AppStore" },
    ),
  ),
);
