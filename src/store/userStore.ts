import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export const useUserStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        userLoader: false,
        setUserLoader: (value: boolean) => set({ loader: value }),
        setUsers: (value: {}) => set({ user: value }),
      }),
      { name: "Users" }
    )
  )
);
