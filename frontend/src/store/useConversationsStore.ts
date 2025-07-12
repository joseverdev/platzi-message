import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import { get } from "node_modules/axios/index.cjs";

type Conversation = {
  _id: string;
  participants: [string, string];
  last_message: {
    content: string;
    sender_id: string;
    timestamp: string;
  };
  created_at: string;
  updated_at: string;
  __v: number;
};

type ConversationsStore = {
  conversations: Conversation[];
  isLoading: boolean;
  selectedConversation: Conversation | null;
  messages: any[];

  getMessagesByConversationId: (conversationId: string) => Promise<void>;
  getAllConversations: () => Promise<void>;
  getSelectedConversation: (conversationId: string) => void;
};

export const useConversationsStore = create<ConversationsStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      isLoading: false,
      selectedConversation: null,
      messages: [],

      addMessage: (message: any) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      getSelectedConversation: (conversationId: string) => {
        const conversation = get().conversations.find(
          (conv) => conv._id === conversationId
        );
        if (conversation) {
          set({ selectedConversation: conversation });
        } else {
          console.log("Conversation not found:", conversationId);
          set({ selectedConversation: null });
        }
      },

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
      getMessagesByConversationId: async (conversationId: string) => {
        set({ isLoading: true });
        try {
          const { data } = await axiosInstance.get(
            `/conversations/${conversationId}`
          );
          set({ messages: data.data });
        } catch (error) {
          console.error("Error fetching messages", error);
          set({ messages: [] });
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
        messages: state.messages,
      }),
    }
  )
);
