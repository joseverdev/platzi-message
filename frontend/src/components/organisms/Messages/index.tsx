import { useEffect } from 'react';

import './index.css';
import { Message } from '../../molecules/Message';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';
import { useConversationsStore } from '@/store/useConversationsStore';
import io from 'socket.io-client';

function Messages() {
  const navigate = useNavigate();

  const { getAllConversations, conversations } = useConversationsStore();

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('receive_message', () => {
      getAllConversations();
    });

    newSocket.on('conversations_updated', (data) => {
      console.log('Conversations updated', data);
      // getAllConversations();
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <section className="messages-container">
      {conversations?.length > 0 ? (
        conversations.map((conversation) => (
          <Message
            key={conversation._id}
            conversation={conversation}
            onClick={() => navigate(`/chat/${conversation._id}`)}
          />
        ))
      ) : (
        <div className="empty-messages">
          <p className="empty-list">
            ¡Sin chats! Agrega amigos para empezar a conversar.
          </p>
          <button onClick={() => navigate('/agregar')} className="button__add">
            <UserRoundPlus size={48} />
          </button>
        </div>
      )}
    </section>
  );
}

export { Messages };
