import astronauta from '@/assets/images/astronauta.png';
import './index.css';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';

interface MessageProps {
  conversation: {
    _id: string;
    participants: string[];
    last_message: {
      content: string;
      sender_id: string;
    };
  };
  onClick: () => void;
}

function Message({ conversation, onClick }: MessageProps) {
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [otherUser, setOtherUser] = useState(null);

  const { users, getAllUsers, user } = useAuthStore();

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  }, [users, getAllUsers]);

  useEffect(() => {
    if (user && conversation.participants.length > 0) {

      const otherUserId = conversation.participants.find(
        (id) => id !== user.user_id
      );

      const foundUser = users.find((u) => u.user_id === otherUserId);
      setOtherUser(foundUser);
    }
  }, [user, conversation.participants, users]);

  useEffect(() => {
    if (conversation.last_message.sender_id !== user?.user_id) {
      setIsNewMessage(true);
    } else {
      setIsNewMessage(false);
    }
  }, [conversation.last_message, user]);

  return (
    <article onClick={onClick} className={`message`}>
      <figure className="message__user">
        <img
          className="message__image"
          src={otherUser?.avatar || astronauta}
          alt="logo"
        />
        <figcaption>
          <p className="message__name">{otherUser?.fullname || 'Anonimo'}</p>
          <p className="message__message">
            {conversation.last_message.content || 'Dile Hola a tus amigos!'}
          </p>
        </figcaption>
        <div className="new-message">
          <div
            className={`new-message__icon ${!isNewMessage && 'new-message__icon--inactive'
              }`}
          ></div>
        </div>
      </figure>
    </article>
  );
}

export { Message };
