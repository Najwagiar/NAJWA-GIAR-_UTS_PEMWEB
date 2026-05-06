import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ================= TYPE ================= */

interface Category {
  title: string;
  description: string;
}

interface Speaker {
  Nama: string;
  Role: string;
  Foto?: string;
}

interface Event {
  namaEvent: string;
  pembicara: string;
  tanggal: string;
  jam: string;
}

/* ================= STATE ================= */

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;

  login: (userName: string) => void;
  logout: () => void;

  /* CATEGORY */
  categories: Category[];
  addCategory: (data: Category) => void;
  deleteCategory: (index: number) => void;

  /* SPEAKER */
  speakers: Speaker[];
  addSpeaker: (data: Speaker) => void;
  deleteSpeaker: (index: number) => void;

  /* EVENT */
  events: Event[];
  addEvent: (data: Event) => void;
  deleteEvent: (index: number) => void;
}

/* ================= STORE ================= */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      /* AUTH */
      login: (userName: string) =>
        set({ isAuthenticated: true, user: userName }),

      logout: () =>
        set({ isAuthenticated: false, user: null }),

      /* ================= CATEGORY ================= */
      categories: [],

      addCategory: (data) =>
        set((state) => ({
          categories: [...state.categories, data],
        })),

      deleteCategory: (index) =>
        set((state) => ({
          categories: state.categories.filter((_, i) => i !== index),
        })),

      /* ================= SPEAKER ================= */
      speakers: [],

      addSpeaker: (data) =>
        set((state) => ({
          speakers: [...state.speakers, data],
        })),

      deleteSpeaker: (index) =>
        set((state) => ({
          speakers: state.speakers.filter((_, i) => i !== index),
        })),

      /* ================= EVENT ================= */
      events: [],

      addEvent: (data) =>
        set((state) => ({
          events: [...state.events, data],
        })),

      deleteEvent: (index) =>
        set((state) => ({
          events: state.events.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);