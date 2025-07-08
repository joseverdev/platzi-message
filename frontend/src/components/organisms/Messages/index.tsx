import React, { useEffect, useState } from 'react';

import './index.css';
import { Message } from '../../molecules/Message';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';
import { useConversationsStore } from '@/store/useConversationsStore';

function Messages() {
  const [chatList, setChatList] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { getAllConversations, conversations } = useConversationsStore();
  console.log('🚀 ~ Messages ~ conversations:', conversations);

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <section className="messages-container">
      {conversations?.length > 0 ? (
        conversations.map((conversation) => (
          <Message
            key={conversation._id}
            user={conversation.participants[1]}
            lastMessage={conversation.last_message}
            onClick={() => navigate(`/chat/${conversation.other_user_id}`)}
          />
        ))
      ) : (
        <div className="empty-messages">
          <p className="empty-list">
            ¡Sin chats! Agrega amigos para empezar a conversar.
          </p>
          <button onClick={() => navigate('/agregar')} className="button__add">
            {/* <AddIcon /> */}
            <UserRoundPlus size={48} />
          </button>
        </div>
      )}
    </section>
  );
}

export { Messages };
