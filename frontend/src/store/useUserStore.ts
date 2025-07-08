// src/store/useUsersStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

import type { TUser } from "@/types/user.types";

interface UsersStore {
  users: TUser[];
  contacts: TUser[];
  isLoading: boolean;
  selectedUser: TUser | null;

  // Acciones
  getAllUsers: () => Promise<void>;
  // getContacts: () => Promise<void>;
  searchUsers: (query: string) => TUser[];
  addContact: (userId: string) => Promise<void>;
  removeContact: (userId: string) => Promise<void>;
  setSelectedUser: (user: TUser | null) => void;
  updateUserStatus: (userId: string, isOnline: boolean) => void;
}

export const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => ({
      users: [],
      contacts: [],
      isLoading: false,
      selectedUser: null,

      getAllUsers: async () => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get("/users");
          set({ users: res.data });
        } catch (error) {
          console.log("Error fetching users", error);
        } finally {
          set({ isLoading: false });
        }
      },

      /* getContacts: async () => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get("/users/contacts");
          set({ contacts: res.data });
        } catch (error) {
          console.log("Error fetching contacts", error);
        } finally {
          set({ isLoading: false });
        }
      }, */

      searchUsers: (query: string) => {
        const { users } = get();
        return users.filter(
          (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
      },

      addContact: async (userId: number) => {
        try {
          await axiosInstance.post(`/users/contacts/${userId}`);
          await get().getContacts(); // Refrescar contactos
        } catch (error) {
          console.log("Error adding contact", error);
        }
      },

      removeContact: async (userId: number) => {
        try {
          await axiosInstance.delete(`/users/contacts/${userId}`);
          await get().getContacts(); // Refrescar contactos
        } catch (error) {
          console.log("Error removing contact", error);
        }
      },

      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user });
      },

      updateUserStatus: (userId: number, isOnline: boolean) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.user_id === userId
              ? {
                  ...user,
                  isOnline,
                  lastSeen: isOnline ? undefined : new Date().toISOString(),
                }
              : user
          ),
          contacts: state.contacts.map((user) =>
            user.user_id === userId
              ? {
                  ...user,
                  isOnline,
                  lastSeen: isOnline ? undefined : new Date().toISOString(),
                }
              : user
          ),
        }));
      },
    }),
    {
      name: "users-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        contacts: state.contacts,
        selectedUser: state.selectedUser,
      }),
    }
  )
);
