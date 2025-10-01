import { create } from "zustand";

interface LogoutModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useLogoutModalStore = create<LogoutModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
