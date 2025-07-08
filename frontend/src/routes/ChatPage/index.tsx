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
  const [userChat, setUserChat] = useState<TUser | null>(null);


  const { users, getAllUsers } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const { user } = useAuthStore();

    

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.user_id == id);
      if (foundUser) setUserChat(foundUser);
    }
  }, [users, id]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    if (userChat) {
      newSocket.emit('join', user?.user_id);
    }

    newSocket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userChat, user.user_id]);

  useEffect(() => {
    if (userChat && user) {
      axiosInstance
        .get(`messages/chat/${user.user_id}/${userChat.user_id}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userChat, user, messages]);

 
  return (
    <>
      <MainLayout>
        <section className="chat-page">
          <ChatHeader user={userChat} />
          <main>
            <section className="chat">
              <div className="chat__container" ref={chatContainerRef}>
                {messages.map((message, index) => {
                  if (
                    message.sender_id == user.user_id &&
                    message.receiver_id == userChat.user_id
                  ) {
                    return (
                      <MessageSend key={index} message={message} user={user} />
                    );
                  } else if (
                    message.sender_id == userChat.user_id &&
                    message.receiver_id == user.user_id
                  ) {
                    return (
                      <MessageReceived
                        key={index}
                        message={message}
                        user={userChat}
                      />
                    );
                  }
                })}
              </div>
            </section>
          </main>
          <Write userChat={userChat} socket={socket} />
        </section>
      </MainLayout>
    </>
  );
}

export { ChatPage };
