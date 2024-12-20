import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Col } from 'reactstrap';
import { IComentarioView } from 'app/shared/model/comentarios-view.model';
import { TIPOSCOMENTARIOS } from 'app/config/constants';
import ChatUser from './Usuario/ChatUser';
import ChatEbisa from './Ebisa/Chat-ebisa';
import ChatTalker from './Talker/ChatTalker';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';

const ChatMessage = ({ isUser, tipoComentario, resposta, nomeUsuario }: { isUser: boolean; tipoComentario: string; resposta: string; nomeUsuario?: string }) => {
    if (isUser) {
        return <ChatUser resposta={resposta}/>
    } else if (tipoComentario === TIPOSCOMENTARIOS.EBISA && !isUser) {
        return <ChatEbisa resposta={resposta}/>
    } else {
        return <ChatTalker resposta={resposta} nomeUsuario={nomeUsuario}/>
    }
};

const handleReturnTypeComentarios = (data: IComentarioView, isEbisa: boolean, isGinfra: boolean, isUnidade: boolean) => {
  const { tipoComentario, resposta, nomeUsuario } = data;

  const isUser =
    (tipoComentario === TIPOSCOMENTARIOS.EBISA && isEbisa) ||
    (tipoComentario === TIPOSCOMENTARIOS.GINFRA && isGinfra) ||
    (tipoComentario === TIPOSCOMENTARIOS.UNIDADE && isUnidade);

  return <ChatMessage isUser={isUser} tipoComentario={tipoComentario} resposta={resposta} nomeUsuario={nomeUsuario} />;
};

const ChatComponent = ({
  solicitacaoViewServico,
  isEbisa,
  isGinfra,
  isUnidade,
}: {
  solicitacaoViewServico: ISolicitacaoViewServicoDto;
  isEbisa: boolean;
  isGinfra: boolean;
  isUnidade: boolean;
}) => {
  return (
    <Col>
      <div className="chat-container">
        {/* Header do Chat */}
        <div className="chat-container-header">
          <span>Chat</span>
          <div className="chat-container-header_icon">
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>
        {/* Dados do Chat */}
        <div className="chat-data-container">
          {solicitacaoViewServico?.comentarios?.map((data: IComentarioView, key: number) => (
            <React.Fragment key={key}>{handleReturnTypeComentarios(data, isEbisa, isGinfra, isUnidade)}</React.Fragment>
          ))}
        </div>
        {/* Entrada do Chat */}
        {isUnidade && <div className="chat-input-container">
          <Input placeholder="Digite uma mensagem" />
          <Button>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>}
      </div>
    </Col>
  );
};

export default ChatComponent;
