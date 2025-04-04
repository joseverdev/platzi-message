import React from "react";
import "./MessageSend.css";
import astronauta from "../../assets/images/astronauta.png";
function MessageSend({ user, message }) {

  return (
    <article className="messageContainer"> 
      <div className="messageBox">

      <p className="chat__message  chat__send">
        {message.text}
      </p>
      <p className="chat__message-time chat__send-time">
        <span>10:01 AM</span>
        <span className="chat__message-name">{user.username}</span>
        <span>
          <img src={user.profilePic||astronauta} alt="" />
        </span>
      </p>
      </div>
    </article>
  );
}

export {  MessageSend };
