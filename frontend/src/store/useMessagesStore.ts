// src/store/useMessagesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";

interface Message {
  message_id: string;
  content: string;
  sender_id: number;
  receiver_id: number;
  created_at: string;
  message_type: 'text' | 'image' | 'file';
  is_read: boolean;
  reply_to?: string;
}

interface Chat {
  chat_id: string;
  participants: number[];
  last_message: Message | null;
  unread_count: number;
  updated_at: string;
}

interface MessagesStore {
  messages: Record<string, Message[]>; // chatId -> messages
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  isTyping: Record<string, boolean>; // userId -> isTyping

  // Acciones
  getChats: () => Promise<void>;
  getMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string, type?: 'text' | 'image') => Promise<void>;
  markAsRead: (chatId: string, messageId: string) => Promise<void>;
  setCurrentChat: (chatId: string | null) => void;
  deleteMessage: (chatId: string, messageId: string) => Promise<void>;
  setTyping: (userId: number, isTyping: boolean) => void;
  
  // Real-time
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
}

export const useMessagesStore = create<MessagesStore>()(
  persist(
    (set, get) => ({
      messages: {},
      chats: [],
      currentChatId: null,
      isLoading: false,
      isTyping: {},

      getChats: async () => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get("/chats");
          set({ chats: res.data });
        } catch (error) {
          console.log("Error fetching chats", error);
        } finally {
          set({ isLoading: false });
        }
      },

      getMessages: async (chatId: string) => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get(`/chats/${chatId}/messages`);
          set(state => ({
            messages: {
              ...state.messages,
              [chatId]: res.data
            }
          }));
        } catch (error) {
          console.log("Error fetching messages", error);
        } finally {
          set({ isLoading: false });
        }
      },

      sendMessage: async (chatId: string, content: string, type = 'text') => {
        try {
          const res = await axiosInstance.post(`/chats/${chatId}/messages`, {
            content,
            message_type: type
          });
          
          // Agregar mensaje inmediatamente (optimistic update)
          get().addMessage(res.data);
        } catch (error) {
          console.log("Error sending message", error);
        }
      },

      markAsRead: async (chatId: string, messageId: string) => {
        try {
          await axiosInstance.patch(`/chats/${chatId}/messages/${messageId}/read`);
          
          set(state => ({
            messages: {
              ...state.messages,
              [chatId]: state.messages[chatId]?.map(msg => 
                msg.message_id === messageId 
                  ? { ...msg, is_read: true }
                  : msg
              ) || []
            }
          }));
        } catch (error) {
          console.log("Error marking message as read", error);
        }
      },

      setCurrentChat: (chatId: string | null) => {
        set({ currentChatId: chatId });
      },

      deleteMessage: async (chatId: string, messageId: string) => {
        try {
          await axiosInstance.delete(`/chats/${chatId}/messages/${messageId}`);
          
          set(state => ({
            messages: {
              ...state.messages,
              [chatId]: state.messages[chatId]?.filter(msg => 
                msg.message_id !== messageId
              ) || []
            }
          }));
        } catch (error) {
          console.log("Error deleting message", error);
        }
      },

      setTyping: (userId: number, isTyping: boolean) => {
        set(state => ({
          isTyping: {
            ...state.isTyping,
            [userId]: isTyping
          }
        }));
      },

      addMessage: (message: Message) => {
        const chatId = `${Math.min(message.sender_id, message.receiver_id)}-${Math.max(message.sender_id, message.receiver_id)}`;
        
        set(state => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), message]
          }
        }));
      },

      updateMessage: (messageId: string, updates: Partial<Message>) => {
        set(state => {
          const newMessages = { ...state.messages };
          
          Object.keys(newMessages).forEach(chatId => {
            newMessages[chatId] = newMessages[chatId].map(msg =>
              msg.message_id === messageId ? { ...msg, ...updates } : msg
            );
          });
          
          return { messages: newMessages };
        });
      },
    }),
    {
      name: "messages-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
        // No persistir mensajes completos para evitar problemas de storage
      }),
    }
  )
);