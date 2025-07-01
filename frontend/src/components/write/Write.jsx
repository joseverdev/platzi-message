import React from "react";
import "./Write.css";
import { SendIcon } from "../Icons/SendIcon";
import { useAuthStore } from "../../store/useAuthStore";

function Write({userChat, socket}) {
  const [message, setMessage] = React.useState('');

  const { user } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket && message) {
      socket.volatile.emit('send_message', {
        from: {
          user_id: user.user_id,
          username: user.username
        },
        to: {
          user_id: userChat.user_id,
          username: userChat.username
        },
        message,
      });
      setMessage('');
    }
  };


  return (
    <section>
      <article >
        <form onSubmit={handleSubmit} className="write__container">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe aquí..." />
          <button className="write__send button">
            <SendIcon />
          </button>
        </form>
      </article>
    </section>
  );
}

export { Write };
