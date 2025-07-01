import React, { useEffect, useState, useRef } from "react";
import "./ChatPage.css";

import { MainLayout } from "../../components/MainLayout/MainLayout";
import { ChatHeader } from "../../components/ChatHeader/ChatHeader";
import { Write } from "../../components/write/Write";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { MessageReceived } from "../../components/MessageReceived/MessageReceived";
import { MessageSend } from "../../components/MessageSend/MessageSend";
import io from "socket.io-client";
import { axiosInstance } from "../../utils/axios";

function ChatPage() {
  const chatContainerRef = useRef(null);
  const { id } = useParams();
  const { users, getAllUsers } = useAuthStore();
  const [userChat, setUserChat] = React.useState(null);
  const [socket, setSocket] = React.useState(null);

  const [messages, setMessages] = React.useState([]);
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    // console.log('Scrolling to bottom');
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
      setUserChat(foundUser);
    }
  }, [users, id]);


  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    // console.log('User chat:', userChat);
    if (userChat) {
      newSocket.emit('join', user.user_id);
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

  useEffect(()=> {
    if(userChat && user){
      axiosInstance.get(`messages/chat/${user.user_id}/${userChat.user_id}`)
        .then(res => {
          setMessages(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [userChat, user, messages])

  return (
    <>
      <MainLayout>
        <section className="chat-page">
          <ChatHeader user={userChat} />
          <main>
            <section className="chat">
              <div className="chat__container" ref={chatContainerRef}>
                
                {messages.map((message, index) => {
                  if(message.sender_id == user.user_id && message.receiver_id == userChat.user_id) {
                    return <MessageSend key={index} message={message} user={user} />;
                  } else if (message.sender_id == userChat.user_id && message.receiver_id == user.user_id) {
                    return <MessageReceived key={index} message={message} user={userChat} />;
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
