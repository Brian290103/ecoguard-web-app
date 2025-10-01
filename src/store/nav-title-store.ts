import { create } from "zustand";

interface NavTitleState {
  title: string;
  setTitle: (newTitle: string) => void;
}

export const useNavTitleStore = create<NavTitleState>((set) => ({
  title: "Dashboard", // Default title
  setTitle: (newTitle) => set({ title: newTitle }),
}));
