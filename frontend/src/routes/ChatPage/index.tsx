import React, { useEffect, useState, useRef } from 'react';
import './index.css';

import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { ChatHeader } from '../../components/organisms/ChatHeader';
import { Write } from '../../components/molecules/write';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { MessageReceived } from '../../components/molecules/MessageReceived';
import { MessageSend } from '../../components/molecules/MessageSend';
import io from 'socket.io-client';

import type { TUser } from '@/types/user.types';
import { useConversationsStore } from '@/store/useConversationsStore';

function ChatPage() {
  const chatContainerRef = useRef<HTMLElement>(null);
  const { id: conversationId } = useParams();

  const [socket, setSocket] = useState(null);
  const [otherUser, setOtherUser] = useState<TUser | null>(null);

  const { users, getAllUsers } = useAuthStore();
  const { user } = useAuthStore();
  const { getAllConversations } = useConversationsStore();

  const {
    messages,
    addMessage,
    selectedConversation,
    getSelectedConversation,
    getMessagesByConversationId,
  } = useConversationsStore();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
      if (users.length === 0) {
        getAllUsers();
      }
    }, 100);
  };

  useEffect(() => {
    if (conversationId) {
      getSelectedConversation(conversationId);
      getMessagesByConversationId(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    if (selectedConversation && users.length > 0 && user) {
      const otherUserId = selectedConversation.participants.find(
        (participandId) => participandId !== user.user_id
      );
      const otherUserData = users.find((u) => u.user_id === otherUserId);
      setOtherUser(otherUserData);
    }
  }, [selectedConversation, users, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    if (!user?.user_id || !conversationId) return;

    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server', newSocket);
      newSocket.emit('join', user?.user_id);
      newSocket.emit('join_conversation', conversationId);
    });
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    newSocket.on('receive_message', (data) => {
      console.log('RECEIVE MESSAGE EVENT TRIGERED', data);

      if (data.conversation_id === conversationId) {
        console.log('Mensaje recibido en la conversación actual:', data);
        addMessage(data);
        scrollToBottom();
      } else {
        console.log('Mensaje recibido en otra conversación, ignorando');
        getAllConversations();
        return;
      }

      // getMessagesByConversationId(conversationId);
      // getAllConversations();
    });

    newSocket.on('conversation_updated', (data) => {
      console.log('🚀 ~ newSocket.on ~ conversation_updated:', data);
      getAllConversations();
    });

    setSocket(newSocket);

    return () => {
      console.log('Disconnecting socket');
      newSocket.emit('leave_conversation', conversationId);
      newSocket.close();
    };
  }, [user?.user_id, conversationId]);

  useEffect(() => {
    console.log('🚀 ~ ChatPage component re-renderred ~ messages:', messages);
  }, [messages]);
  return (
    <>
      <MainLayout>
        <section className="chat-page">
          <ChatHeader user={otherUser} />
          <main>
            <section className="chat">
              <div className="chat__container" ref={chatContainerRef}>
                {messages.length > 0 ? (
                  messages.map((message, index) => {
                    if (message.sender_id === user.user_id) {
                      return (
                        <MessageSend
                          key={index}
                          message={message}
                          user={user}
                        />
                      );
                    } else {
                      return (
                        <MessageReceived
                          key={index}
                          message={message}
                          user={otherUser}
                        />
                      );
                    }
                  })
                ) : (
                  <div className="chat__empty">
                    <p>No hay mensajes</p>
                  </div>
                )}
              </div>
            </section>
          </main>
          <Write
            userChat={otherUser}
            socket={socket}
            conversationId={conversationId}
          />
        </section>
      </MainLayout>
    </>
  );
}

export { ChatPage };
