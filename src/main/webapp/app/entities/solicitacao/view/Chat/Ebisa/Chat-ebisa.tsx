import React from 'react';

interface IChatEbisa {
  resposta: string;
}

const ChatEbisa = (props: IChatEbisa) => {
  const { resposta } = props;
  
  return (
    <div className="chat-data-talker-container">
      <div className="chat-data-talker-message-container">
        <span>{resposta}</span>
      </div>
      <div className="chat-data-talker-logo" >
        <img style={{width: '100%', padding: '0.5em'}} src="./content/images/ebisa-logo-noBg-perfil.png" alt='Logo Ebisa' />
      </div>
    </div>
  );
};

export default ChatEbisa;
