import React from 'react';

interface IChatTalker {
  resposta: string;
  nomeUsuario: string;
}

const ChatTalker = (props: IChatTalker) => {
  const { resposta, nomeUsuario } = props;
  
  return (
    <>
      <div className="chat-data-talker-container">
        <div className="chat-data-talker-message-container">
          <span>{resposta}</span>
        </div>
        <div className="chat-data-talker-logo">{nomeUsuario?.slice(0, 1)}</div>
      </div>
    </>
  );
};

export default ChatTalker;
