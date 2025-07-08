import astronauta from '@/assets/images/astronauta.png';
import './index.css';

function Message({ user, lastMessage, onClick }) {
  return (
    <article onClick={onClick} className={`message`}>
      <figure className="message__user">
        <img
          className="message__image"
          src={user?.avatar || astronauta}
          alt="logo"
        />
        <figcaption>
          <p className="message__name">{user?.name || 'sin nombre'}</p>
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
