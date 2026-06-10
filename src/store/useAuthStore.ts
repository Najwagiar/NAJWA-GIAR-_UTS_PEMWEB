import { create } from "zustand";
import { persist } from "zustand/middleware";

/* 1. TYPES / INTERFACES */

interface Category {
  id?: number;
  title: string;
  description: string;
}

interface Speaker {
  id?: number; 
  name: string;
  role: string;
  image?: string;
}

interface Event {
  id: number;
  name: string;
  categoryId: number;
  location: string;
  dateEvent: string;
  description: string;
  pembicaraId: number;
}

interface User {
  id?: number; 
  name: string;
  email: string;
  password?: string; 
  foto?: string;
  role?: string;
}

/* 2. STATE INTERFACE */

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
  fetchSpeakers: () => Promise<void>; 
  addSpeaker: (data: Speaker) => Promise<void>;
  deleteSpeaker: (id: number) => Promise<void>; 

  /* EVENT */
  events: any[]; 
  fetchEvents: () => Promise<void>; 
  addEvent: (data: Omit<Event, "id">) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;

  /* USER MANAGEMENT */
  users: User[];
  loadingUser: boolean; 
  fetchUsers: () => Promise<void>;
  addUser: (data: User) => Promise<void>; 
  deleteUser: (id: number) => Promise<void>;
}

/* 3. STORE IMPLEMENTATION */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      /* AUTH */
      login: (userName: string) => set({ isAuthenticated: true, user: userName }),
      logout: () => set({ isAuthenticated: false, user: null }),

      /* CATEGORY */
      categories: [],
      addCategory: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${baseUrl}/category`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: data.title }),
          });
          if (!response.ok) throw new Error("Gagal tambah category");
          set((state) => ({ categories: [...state.categories, data] }));
          alert("Category berhasil ditambahkan");
        } catch (error) {
          console.log(error);
          alert("Gagal menambahkan category");
        }
      },
      deleteCategory: (index) =>
        set((state) => ({ categories: state.categories.filter((_, i) => i !== index) })),

      /* SPEAKER */
      speakers: [],

      fetchSpeakers: async () => {
        const baseUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await fetch(`${baseUrl}/speakers`);
          if (!response.ok) throw new Error("Gagal fetch data pembicara");
          const data = await response.json();
          const speakersData = Array.isArray(data) ? data : data.data || [];
          set({ speakers: speakersData });
        } catch (error) {
          console.error("Gagal fetch speakers", error);
          set({ speakers: [] });
        }
      },
      addSpeaker: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${baseUrl}/speakers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!response.ok) throw new Error("Gagal tambah speaker");
          const result = await response.json(); 
          const newSpeaker = result.data || result; // Proteksi pembungkus .data dari API
          set((state) => ({ speakers: [newSpeaker, ...state.speakers] }));
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      deleteSpeaker: async (id: number) => {
        const baseUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await fetch(`${baseUrl}/speakers/${id}`, { method: "DELETE" });
          if (!response.ok) throw new Error("Gagal hapus speaker di server");
          set((state) => ({ speakers: state.speakers.filter((item) => item.id !== id) }));
        } catch (error) {
          console.error(error);
          alert("Gagal menghapus pembicara");
        }
      },

      /* EVENT */
      events: [],
      fetchEvents: async () => {
        const baseUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await fetch(`${baseUrl}/events`);
          const data = await response.json();
          const eventsData = Array.isArray(data) ? data : data.data || [];
          set({ events: eventsData });
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
          set((state) => ({ events: [...state.events, result.data || result] }));
          alert("Event berhasil ditambahkan");
        } catch (error) {
          alert("Gagal menambahkan event");
        }
      },
      deleteEvent: async (id: number) => {
        const baseUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await fetch(`${baseUrl}/events/${id}`, { method: "DELETE" });
          if (!response.ok) throw new Error("Gagal hapus event");
          set((state) => ({ events: state.events.filter((item) => item.id !== id) }));
        } catch (error) {
          console.error(error);
          alert("Gagal menghapus event");
        }
      },

      /* USER MANAGEMENT ACTIONS */
      users: [],
      loadingUser: false,

      fetchUsers: async () => {
        const baseUrl = import.meta.env.VITE_API_URL;
        set({ loadingUser: true });
        try {
          const response = await fetch(`${baseUrl}/users`);
          if (!response.ok) throw new Error("Gagal fetch data user");
          const data = await response.json();
          const usersData = Array.isArray(data) ? data : data.data || [];
          set({ users: usersData, loadingUser: false });
        } catch (error) {
          console.error("Gagal fetch users", error);
          set({ loadingUser: false, users: [] });
        }
      },

      addUser: async (data) => {
        try {
          const baseUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || "Gagal membuat user baru");
          }

          const result = await response.json();
          const newUser = result.data || result;

          set((state) => ({
            users: [newUser, ...state.users],
          }));

          alert("User berhasil ditambahkan!");
        } catch (error: any) {
          console.error(error);
          throw error;
        }
      },

      deleteUser: async (id: number) => {
        const baseUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await fetch(`${baseUrl}/users/${id}`, { method: "DELETE" });
          if (!response.ok) throw new Error("Gagal hapus user di server");
          set((state) => ({ users: state.users.filter((item) => item.id !== id) }));
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);