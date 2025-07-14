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
import { axiosInstance } from '../../utils/axios';

import type { TUser } from '@/types/user.types';
import { useConversationsStore } from '@/store/useConversationsStore';

function ChatPage() {
  const chatContainerRef = useRef<HTMLElement>(null);
  const { id } = useParams();

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
    }, 100);
  };

  useEffect(() => {
    if (id) {
      getSelectedConversation(id);
      getMessagesByConversationId(id);
    }
  }, [id]);

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
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', (socket) => {
      // console.log('Connected to server', socket);
    });

    if (otherUser) {
      newSocket.emit('join', user?.user_id);
    }

    newSocket.on('receive_message', (data) => {
      // console.log('🚀 ~ newSocket.on ~ data:', data);
      addMessage(data);
      getAllConversations();
      scrollToBottom();
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [otherUser, user.user_id]);

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
          <Write userChat={otherUser} socket={socket} conversationId={id} />
        </section>
      </MainLayout>
    </>
  );
}

export { ChatPage };
