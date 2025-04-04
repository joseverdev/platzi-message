import React from "react";
import astronauta from "../../assets/images/astronauta.png";

function Message({ user, text, className, onClick }) {
  return (
    <article onClick={onClick} className={`message ${className}`}>
      <figure className="message__user">
        <img className="message__image" src={user?.profilePic||astronauta} alt="logo" />
        <figcaption>
          <p className="message__name">{user?.name||'sin nombre'}</p>
          <p className="message__message">
            {text||'Dile Hola a tus amigos!'}
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
