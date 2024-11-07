import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from '../solicitacao.reducer';
import {
  faChevronLeft,
  faComment,
  faFloppyDisk,
  faMinus,
  faPaperPlane,
  faPen,
  faPlus,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import './solicitacao-detail.scss';

export const SolicitacaoDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitacaoEntity = useAppSelector(state => state.solicitacao.entity);
  return (
    <div className="solicitacao-create-container">
      <h2>Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Titulo</Label>
            <Input placeholder="Titulo" />
          </Col>

          <Col>
            <Label>Classificação</Label>
            <Input type="select">
              <option>Tipo Solicitação</option>
            </Input>
          </Col>

          <Col>
            <Label>Prazo</Label>
            <Input type="datetime-local" />
          </Col>
        </Row>

        <Row>
          <Col className="descricao-container">
            <Label>Descrição</Label>
            <Input type="textarea" placeholder="Descrição" />
          </Col>

          <Col>
            <div className="inventario-container">
              <span>Inventario</span>

              <div className="inventario-container-data">
                <div className="inventario-container_search-box">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Input type="text" placeholder="Pesquisa" />
                </div>

                <div className="itens-list">
                  <div className="itens-container">
                    <div className="itens-container-text">
                      <span>Teste</span>
                    </div>

                    <div className="itens-container-icon" style={{width: '10%'}}>
                      <span>4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className="chat-container">
              {/* Div para conter o header */}
              <div className="chat-container-header">
                <span>Chat</span>
                <div className="chat-container-header_icon">
                  <FontAwesomeIcon icon={faComment} />
                </div>
              </div>
              {/*  Div que vai conter os dados do chat */}
              <div className="chat-data-container">
                <div className="chat-data-talker-container">
                  {/* mensagem que o usuário escreveu */}
                  <div className="chat-data-talker-message-container">
                    <span> Teste </span>
                  </div>
                  <div className="chat-data-talker-logo">{/* Circulo com a primeira letra do nome do usuario */} L </div>
                </div>

                <div className="chat-data-user-container">
                  {/* mensagem que você escreveu */}
                  <div className="chat-data-user-message-container">
                    <span> Testando </span>
                  </div>
                  <div className="chat-data-user-logo">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
              </div>
              <div className="chat-input-container">
                <Input placeholder="Digite uma mensagem" />
                <Button>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="buttons-container">
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span> Voltar </span>
        </Button>

        <Button>
          <span> Editar </span>
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </div>
    </div>
  );
};

export default SolicitacaoDetail;
