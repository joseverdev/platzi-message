import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

type Message = {
  _id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  type: string;
};

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
  messages: Message[];
  isLoading: boolean;
  selectedConversation: Conversation | null;

  // Acciones para conversaciones
  getAllConversations: () => Promise<void>;
  getSelectedConversation: (conversationId: string) => void;

  // Acciones para mensajes
  getMessagesByConversationId: (conversationId: string) => Promise<void>;
  addMessage: (message: Message) => void;

  // ✅ Nueva acción para actualizar last_message
  // updateLastMessage: (conversationId: string, message: Message) => void;
};

export const useConversationsStore = create<ConversationsStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: [],
      isLoading: false,
      selectedConversation: null,

      getAllConversations: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axiosInstance.get("/conversations");
          set({ conversations: data.data });
        } catch (error) {
          console.error("Error fetching conversations", error);
        } finally {
          set({ isLoading: false });
        }
      },

      getSelectedConversation: (conversationId: string) => {
        const conversation = get().conversations.find(
          (conv) => conv._id === conversationId
        );
        if (conversation) {
          set({ selectedConversation: conversation });
        } else {
          set({ selectedConversation: null });
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

      addMessage: (message: Message) => {
        console.log("🚀 ~ addmessage:", message);
        set((state) => ({
          messages: [...state.messages, message],
        }));
        // get().getAllConversations();
        // get().updateLastMessage(message.conversation_id, message);
      },

      // ✅ Actualizar el último mensaje de una conversación
      /* updateLastMessage: (conversationId: string, message: Message) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv._id === conversationId
              ? {
                  ...conv,
                  last_message: {
                    content: message.content,
                    sender_id: message.sender_id,
                    timestamp: message.created_at,
                  },
                  updated_at: new Date().toISOString(),
                }
              : conv
          ),
        }));
      }, */
    }),
    {
      name: "conversations-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        messages: state.messages,
        selectedConversation: state.selectedConversation,
      }),
    }
  )
);
