import './index.css';
import astronauta from '@/assets/images/astronauta.png';
function MessageReceived({ user, message }) {
  return (
    <article className="">
      <div className="messageBoxReceived">
        <div className="chat__message  chat__received">
          <p>{message?.content || 'Do not be afrid'}</p>
        </div>
        <p className="chat__message-time">
          <span>
            <img src={astronauta} alt="" />
          </span>
          <span className="chat__message-name">
            {user?.fullname || 'Anonimo'}
          </span>
          <span>10:00 AM</span>
        </p>
      </div>{' '}
    </article>
  );
}

export { MessageReceived };
