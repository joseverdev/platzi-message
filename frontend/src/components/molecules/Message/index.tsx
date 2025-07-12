import astronauta from '@/assets/images/astronauta.png';
import './index.css';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

function Message({ user_id, lastMessage, onClick }) {
  const { users, getAllUsers } = useAuthStore();
  const user = users.find((u) => u.user_id === user_id);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  }, [users, getAllUsers]);

  return (
    <article onClick={onClick} className={`message`}>
      <figure className="message__user">
        <img
          className="message__image"
          src={user?.avatar || astronauta}
          alt="logo"
        />
        <figcaption>
          <p className="message__name">{user?.fullname || 'Anonimo'}</p>
          <p className="message__message">
            {lastMessage.content || 'Dile Hola a tus amigos!'}
          </p>
        </figcaption>
        <div className="new-message">
          <div className="new-message__icon"></div>
        </div>
      </figure>
    </article>
  );
}

export { Message };
