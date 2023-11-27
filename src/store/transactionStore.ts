import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useTransactionStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        transactions: [],
        loader: false,
        setLoader: (value: boolean) => set({ loader: value }),
        setTransactions: (value: {}) => set({ transactions: value }),
      }),
      { name: "Transactions" }
    )
  )
);
