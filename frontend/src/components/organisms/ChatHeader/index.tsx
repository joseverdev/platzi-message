import './index.css';

import astronauta from '@/assets/images/astronauta.png';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { TUser } from '@/types/user.types';

type ChatHeaderProps = {
  user: TUser;
};

function ChatHeader({ user }: ChatHeaderProps) {
  const navigate = useNavigate();

  /*
  todo: this function is not used, but it was in the original code
  const handleAbout = () => {
    navigate(`/about/${user.user_id}`);
  }; */

  return (
    <header className="chat-header ">
      <nav className="chat-header__nav">
        <button
          onClick={() => navigate('/home')}
          className="chat-header__button"
        >
          <MoveLeft />
        </button>
        <article className="chat-header__user">
          <div className="chat-header__user-profile">
            <img
              className="chat-header__user-image"
              src={user?.avatar || astronauta}
              alt="user image"
            />
            <div className="chat-header__user-dot"></div>
          </div>
          <div className="chat-header__user-info">
            <p className="chat-header__user-name">
              {user?.fullname || 'Anonimous'}
            </p>
            <p className="chat-header__user-status">Online</p>
          </div>
        </article>
        <div></div>
      </nav>
    </header>
  );
}

export { ChatHeader };
