import React, { useEffect } from "react";
import astronauta  from "../../assets/images/astronauta.png";

import "./AboutHeader.css";
import { BackIcon } from "../Icons/Backicon";
import { useAnimateButtons } from "../../routes/useAnimateButtons";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function AboutHeader() {
  const { navigateToView } = useAnimateButtons();
  
  const { id } = useParams();
  const [userChat, setUserChat] = React.useState(null);

  const { users, getAllUsers } = useAuthStore();
  
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.user_id == id);
      setUserChat(foundUser);
    }
  }, [users, id]);

  return (
    <header className="about-header">
      <button
        onClick={() => navigateToView("/chat/"+id)}
        className="chat-header__button button"
      >
        <BackIcon />
      </button>
      <figure className="about-header__user">
        <div className="about-header__user-profile">
          <img className="about-header__user__image" src={userChat?.profilePic||astronauta} alt="usuario" />
          <div className="about-header__user-dot"></div>
        </div>
        <figcaption>
          <h2>{userChat?.name||'sin nombre'}</h2>
          <p className="about-header__user__status">Online</p>
          <p>Soy un desarrollador web</p>
        </figcaption>
      </figure>
    </header>
  );
}

export { AboutHeader };
