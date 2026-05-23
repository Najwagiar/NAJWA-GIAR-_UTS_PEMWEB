import { create } from "zustand";

import { persist } from "zustand/middleware";

/* TYPE */

interface Category {
  id?: number;

  title: string;

  description: string;
}

interface Speaker {
  name: string;

  role: string;

  image?: string;
}

interface Event {
  id: number; // Tambahkan ini

  name: string;

  categoryId: number;

  location: string;

  dateEvent: string;

  description: string;

  pembicaraId: number;
}

/* STATE */

interface AuthState {
  isAuthenticated: boolean;

  user: string | null;

  login: (userName: string) => void;

  logout: () => void;

  /* CATEGORY */

  categories: Category[];

  addCategory: (data: Category) => Promise<void>;

  deleteCategory: (index: number) => void;

  /* SPEAKER */

  speakers: Speaker[];

  addSpeaker: (data: Speaker) => Promise<void>;

  deleteSpeaker: (index: number) => void;

  /* EVENT */

  events: any[]; // Gunakan any[] atau buat interface Event yang benar

  fetchEvents: () => Promise<void>; // Tambahkan ini

  addEvent: (data: Omit<Event, "id">) => Promise<void>;

  deleteEvent: (id: number) => Promise<void>;
}

/* STORE */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      user: null,

      /* AUTH */

      login: (userName: string) =>
        set({
          isAuthenticated: true,

          user: userName,
        }),

      logout: () =>
        set({
          isAuthenticated: false,

          user: null,
        }),

      /* CATEGORY */

      categories: [],

      addCategory: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;

          const response = await fetch(`${baseUrl}/category`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: data.title,
            }),
          });

          if (!response.ok) {
            throw new Error("Gagal tambah category");
          }

          set((state) => ({
            categories: [...state.categories, data],
          }));

          alert("Category berhasil ditambahkan");
        } catch (error) {
          console.log(error);

          alert("Gagal menambahkan category");
        }
      },

      deleteCategory: (index) =>
        set((state) => ({
          categories: state.categories.filter((_, i) => i !== index),
        })),

      /* SPEAKER */

      speakers: [],

      addSpeaker: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;

          const response = await fetch(`${baseUrl}/speakers`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error("Gagal tambah speaker");
          }

          const result = await response.json(); // 🔥 PENTING

          set((state) => ({
            speakers: [...state.speakers, result], // 🔥 pakai data dari backend
          }));
        } catch (error) {
          console.log(error);

          throw error;
        }
      },

      deleteSpeaker: (index) =>
        set((state) => ({
          speakers: state.speakers.filter((_, i) => i !== index),
        })),

      /* EVENT */

      events: [],

      fetchEvents: async () => {
        const baseUrl = import.meta.env.VITE_API_URL;

        try {
          const response = await fetch(`${baseUrl}/events`);

          const data = await response.json();

          set({ events: data });
        } catch (error) {
          console.error("Gagal fetch events", error);
        }
      },

      addEvent: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;

          const response = await fetch(`${baseUrl}/events`, {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error("Gagal tambah event");

          const result = await response.json();

          set((state) => ({ events: [...state.events, result.data] }));

          alert("Event berhasil ditambahkan");
        } catch (error) {
          alert("Gagal menambahkan event");
        }
      },

      deleteEvent: async (id: number) => {
        const baseUrl = import.meta.env.VITE_API_URL;

        try {
          const response = await fetch(`${baseUrl}/events/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) throw new Error("Gagal hapus event");

          set((state) => ({
            events: state.events.filter((item) => item.id !== id),
          }));
        } catch (error) {
          console.error(error);

          alert("Gagal menghapus event");
        }
      },
    }),

    {
      name: "auth-storage",
    },
  ),
);
