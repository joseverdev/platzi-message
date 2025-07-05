import React, { useEffect, useState } from 'react';

import './Messages.css';
import { Message } from '../../molecules/Message';
import { axiosInstance } from '../../../utils/axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { UserRoundPlus } from 'lucide-react';

function Messages() {
  const [chatList, setChatList] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    // axiosInstance
    //   .get("/messages/chat/" + user.user_id)
    //   .then((res) => {
    //     setChatList(res.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error in Messages", error);
    //   });
  }, [user.user_id]);

  return (
    <section className="messages-container">
      {chatList?.length > 0 ? (
        chatList.map((chat) => (
          <Message
            key={chat.other_user_id}
            user={chat}
            text={chat.text}
            className={
              user.user_id !== chat.last_sender_id ? 'message-received' : ''
            }
            onClick={() => navigate(`/chat/${chat.other_user_id}`)}
          />
        ))
      ) : (
        <div className="empty-messages">
          <p className="empty-list">
            ¡Sin chats! Agrega amigos para empezar a conversar.
          </p>
          <button onClick={() => navigate('/agregar')} className="button__add">
            {/* <AddIcon /> */}
            <UserRoundPlus size={48} />
          </button>
        </div>
      )}
    </section>
  );
}

export { Messages };
