import astronauta from '@/assets/images/astronauta.png';
import { LucideProps } from 'lucide-react';
import './index.css';

type CardItemProps = {
  user: {
    user_id: string;
    fullname: string;
    avatar?: string | null;
  };
  handleClick?: () => void;
  Icon: React.ComponentType<LucideProps>;
};

const CardItem = ({ user, handleClick, Icon }: CardItemProps) => {
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
        <Icon size={18} />
      </button>
    </article>
  );
};

export { CardItem };
