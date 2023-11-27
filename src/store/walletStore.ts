import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export const useWalletStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        wallets: {},
        walletLoader: false,
        setWalletLoader: (value: boolean) => set({ walletLoader: value }),
        setWallets: (value: {}) => set({ wallets: value }),
      }),
      { name: "Wallets" }
    )
  )
);
