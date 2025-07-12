import { useEffect, useState } from 'react';

import './index.css';
import { Message } from '../../molecules/Message';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';
import { useConversationsStore } from '@/store/useConversationsStore';
import { useAuthStore } from '@/store/useAuthStore';

function Messages() {
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  const { getAllConversations, conversations } = useConversationsStore();

  const { user } = useAuthStore();

  useEffect(() => {
    if (conversations.length === 0) {
      getAllConversations();
    }

    if (conversations.length > 0) {
      const conversationFound = conversations.find((conv) =>
        conv.participants.includes(user.user_id)
      );

      const userId = conversationFound?.participants.find(
        (id) => id !== user.user_id
      );

      setUserId(userId);
    }
  }, []);

  return (
    <section className="messages-container">
      {conversations?.length > 0 ? (
        conversations.map((conversation) => (
          <Message
            key={conversation._id}
            user_id={userId}
            lastMessage={conversation.last_message}
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
