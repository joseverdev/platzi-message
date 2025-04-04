import React, { useEffect } from "react";
import "./Chat.css";
import christian from "../../assets/images/christian.jpg";
import freddy from "../../assets/images/freddy.jpg";
import { ChatReceived } from "../MessageReceived/MessageReceived";
import { ChatSend } from "../MessageSend/MessageSend";
function Chat() {
  
  return (
    <section className="chat">
      <div className="chat__container">
          <ChatReceived  user={christian}  />
        <ChatSend user2={freddy}  />
      </div>
    </section>
  );
}

export { Chat };
