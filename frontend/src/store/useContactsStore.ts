import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import axios from "axios";

// Tipos/Interfaces

export interface Contact {
  user_id: string;
  fullname: string;
  email: string;
  profilePic: string | null;
}

export interface AddContactData {
  user_id: string;
  contact_id: string;
}

interface ContactsStore {
  // Estado
  contacts: Contact[];
  isLoading: boolean;
  selectedContact: Contact | null;
  searchQuery: string;

  // Acciones
  getContacts: () => Promise<void>;
  addContact: (data: AddContactData) => Promise<boolean>;
  removeContact: (userId: string, contactId: string) => Promise<boolean>;
  checkIfContact: (userId: string, contactId: string) => Promise<boolean>;
  searchContacts: (query: string) => Contact[];
  setSelectedContact: (contact: Contact | null) => void;
  setSearchQuery: (query: string) => void;
  clearContacts: () => void;
}

export const useContactsStore = create<ContactsStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      contacts: [],
      isLoading: false,
      selectedContact: null,
      searchQuery: "",

      // Obtener contactos del usuario
      getContacts: async () => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get("/contacts");
          set({ contacts: res.data.data || [] });
        } catch (error) {
          console.error("Error fetching contacts", error);
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Error al cargar contactos"
            );
          } else {
            toast.error("Error inesperado al cargar contactos");
          }
        } finally {
          set({ isLoading: false });
        }
      },

      // Agregar nuevo contacto
      addContact: async (data: AddContactData) => {
        try {
          const res = await axiosInstance.post("/contacts/add", data);

          if (res.data.success) {
            // Recargar la lista de contactos
            await get().getContacts(data.user_id);
            toast.success("Contacto agregado exitosamente");
            return true;
          }

          return false;
        } catch (error) {
          console.error("Error adding contact", error);
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.message || "Error al agregar contacto";
            toast.error(message);
          } else {
            toast.error("Error inesperado al agregar contacto");
          }
          return false;
        }
      },

      // Eliminar contacto
      removeContact: async (userId: string, contactId: string) => {
        try {
          const res = await axiosInstance.delete(`/contacts/${contactId}`);

          if (res.data.success) {
            // Actualizar estado local eliminando el contacto
            set((state) => ({
              contacts: state.contacts.filter(
                (contact) => contact.contacto_id !== contactId
              ),
            }));
            toast.success("Contacto eliminado exitosamente");
            return true;
          }

          return false;
        } catch (error) {
          console.error("Error removing contact", error);
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Error al eliminar contacto"
            );
          } else {
            toast.error("Error inesperado al eliminar contacto");
          }
          return false;
        }
      },

      // Verificar si ya es contacto
      checkIfContact: async (userId: string, contactId: string) => {
        try {
          const res = await axiosInstance.get(`/contacts/check/${contactId}`);
          return res.data.isContact || false;
        } catch (error) {
          console.error("Error checking contact status", error);
          return false;
        }
      },

      // Buscar contactos localmente
      searchContacts: (query: string) => {
        const { contacts } = get();
        if (!query.trim()) return contacts;

        return contacts.filter(
          (contact) =>
            contact.contacto.fullname
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            contact.contacto.email.toLowerCase().includes(query.toLowerCase())
        );
      },

      // Establecer contacto seleccionado
      setSelectedContact: (contact: Contact | null) => {
        set({ selectedContact: contact });
      },

      // Establecer query de búsqueda
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      // Limpiar contactos (logout)
      clearContacts: () => {
        set({
          contacts: [],
          selectedContact: null,
          searchQuery: "",
          isLoading: false,
        });
      },
    }),
    {
      name: "contacts-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        contacts: state.contacts,
        selectedContact: state.selectedContact,
      }),
    }
  )
);

// Hook personalizado para obtener contactos filtrados
export const useFilteredContacts = () => {
  const { contacts, searchQuery, searchContacts } = useContactsStore();

  return searchQuery.trim() === "" ? contacts : searchContacts(searchQuery);
};

// Hook personalizado para verificar si un usuario es contacto
export const useIsContact = (contactId: string) => {
  const { contacts } = useContactsStore();

  return contacts.some((contact) => contact.contacto_id === contactId);
};
