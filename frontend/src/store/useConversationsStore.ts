import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

export const useConversationsStore = create()(
  persist(
    (set, get) => ({
      conversations: [],
      isLoading: false,
      selectedConversation: null,

      getAllConversations: async () => {
        set({ isLoading: true });
        try {
          console.log("Fetching conversations...");
          const { data } = await axiosInstance.get("/conversations");
          set({ conversations: data.data });
        } catch (error) {
          console.error("Error fetching conversations", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "conversations-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        isLoading: state.isLoading,
        selectedConversation: state.selectedConversation,
      }),
    }
  )
);
