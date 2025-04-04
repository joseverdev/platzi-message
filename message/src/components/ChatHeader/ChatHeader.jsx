import React from "react";
import "./ChatHeader.css";

import astronauta  from "../../assets/images/astronauta.png";
import { BackIcon } from "../Icons/Backicon";
import { DotIcon } from "../Icons/DotsIcon";
import { useAnimateButtons } from "../../routes/useAnimateButtons";

function ChatHeader({ user }) {
  const { navigateToView } = useAnimateButtons();

  const handleAbout = () => {
    navigateToView(`/about/${user.user_id}`);
  };

  return (
    <header className="chat-header ">
      <nav className="chat-header__nav">
        <button
          onClick={() => navigateToView("/home")}
          className="chat-header__button button"
        >
          <BackIcon />
        </button>
        <article className="chat-header__user">
          <div className="chat-header__user-profile">
            <img
              className="chat-header__user-image"
              src={user?.profilePic||astronauta}
              alt="user image"
            />
            <div className="chat-header__user-dot"></div>
          </div>
          <div className="chat-header__user-info">
            <p className="chat-header__user-name">{user?.name||'sin nombre'}</p>
            <p className="chat-header__user-status">Online</p>
          </div>
        </article>
        <button
          onClick={handleAbout}
          className="chat-header__about-button button"
        >
          <DotIcon />
        </button>
      </nav>
    </header>
  );
}

export { ChatHeader };
