import React from "react";
import "./MessageReceived.css";
import astronauta from "../../assets/images/astronauta.png";
function MessageReceived({user, message }) {


  return (
    <article className="">
      <div className="messageBoxReceived">
      <div className="chat__message  chat__received">
        <p>{message.text}</p>
      </div>
      <p className="chat__message-time">
        <span>
          <img src={user.profilePic||astronauta} alt="" />
        </span>
        <span className="chat__message-name"> {user.username}</span>
        <span>10:00 AM</span>
      </p>
      </div>    </article>
  );
}

export { MessageReceived };
