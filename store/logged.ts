import { create } from "zustand";

type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthState = {
  logged: boolean;
  user: AuthUser | null;
  setLogged: (value: boolean) => void;
  setUser: (user: AuthUser | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  logged: false,
  user: null,
  setLogged: (value) => set({ logged: value }),
  setUser: (user) => set({ user, logged: Boolean(user) }),
}));
