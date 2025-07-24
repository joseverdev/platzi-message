import React from 'react';
import './index.css';
import { useAuthStore } from '../../../store/useAuthStore';
import { Send } from 'lucide-react';
import { useConversationsStore } from '@/store/useConversationsStore';

function Write({ userChat, socket, conversationId }) {
  const [message, setMessage] = React.useState('');

  const { user } = useAuthStore();

  const { getMessagesByConversationId } = useConversationsStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket && message) {
      socket.volatile.emit('send_message', {
        conversation_id: conversationId,
        sender_id: user.user_id,
        receiver_id: userChat.user_id,
        content: message,
        timestamp: new Date().toISOString(),
      });

      setMessage('');
      getMessagesByConversationId(conversationId);
    }
  };

  return (
    <section>
      <article>
        <form onSubmit={handleSubmit} className="write__container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe aquí..."
          />
          <button className="write__send ">
            <Send />
          </button>
        </form>
      </article>
    </section>
  );
}

export { Write };
