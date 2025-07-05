import "./Chat.css";
import christian from "../../assets/images/christian.jpg";
import freddy from "../../assets/images/freddy.jpg";
import { ChatReceived } from "../../molecules/MessageReceived/MessageReceived";
import { ChatSend } from "../../molecules/MessageSend/MessageSend";
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
