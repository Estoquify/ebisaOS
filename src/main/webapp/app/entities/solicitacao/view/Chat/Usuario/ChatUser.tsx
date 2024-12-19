import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IChatUser {
  resposta: string;
}

const ChatUser = (props: IChatUser) => {
  const { resposta } = props;

  return (
    <>
      <div className="chat-data-user-container">
        <div className="chat-data-user-message-container">
          <span>{resposta}</span>
        </div>
        <div className="chat-data-user-logo">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </>
  );
};

export default ChatUser;
