import React, { useEffect, useState } from "react";

import "./Messages.css";
import { Message } from "../Message/Message";
import { axiosInstance } from "../../utils/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { useAnimateButtons } from "../../routes/useAnimateButtons";

function Messages() {

  const [chatList, setChatList] = useState();

  const { navigateToView } = useAnimateButtons();
  const { user } = useAuthStore();

  useEffect(() => {
    axiosInstance.get('/messages/chat/' + user.user_id)
      .then(res => {
        setChatList(res.data);
      })
      .catch(error => {
        console.log('Error in Messages', error);
      })  
  }, [user.user_id]);



  return (
    <section className="messages-container">

      {chatList?.map((chat) => (
        <Message key={chat.other_user_id} user={chat} text={chat.text} className={user.user_id !== chat.last_sender_id ? 'message-received' : ''} onClick={() => navigateToView(`/chat/${chat.other_user_id}`)}/>
      ))}

    </section>
  );
}

export { Messages };
