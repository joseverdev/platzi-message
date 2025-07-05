import astronauta from '@/assets/images/astronauta.png';
import { UserPlus } from 'lucide-react';

type CardItemProps = {
  user: {
    user_id: string;
    fullname: string;
    avatar: string | null;
  };
  handleClick: () => void;
};

const CardItem = ({ user, handleClick }: CardItemProps) => {
  return (
    <article key={user.user_id} className="card">
      <img
        className="card__avatar"
        src={user.avatar || astronauta}
        alt={`${user.fullname} avatar`}
      />
      <div>
        <p>{user.fullname}</p>
      </div>
      <button onClick={handleClick} className="card__button">
        <UserPlus size={18} />
      </button>
    </article>
  );
};

export { CardItem };
