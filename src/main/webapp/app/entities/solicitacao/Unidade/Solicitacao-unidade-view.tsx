import React, { useEffect, useState } from 'react';
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

import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import dayjs from 'dayjs';
import { ISetorUnidade } from 'app/shared/model/setor-unidade.model';
import axios from 'axios';
import { toast } from 'react-toastify';

export const SolicitacaoUnidadeDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const solicitacaoEntity: ISolicitacao = useAppSelector(state => state.solicitacao.entity);
  const setorUnidadeId = useAppSelector(state => state?.authentication?.account?.setorUnidade?.id);

  const { id } = useParams<'id'>();
  const [setorUnidadeList, setSetorUnidadeList] = useState<ISetorUnidade[]>([]);

  useEffect(() => {
    if (setorUnidadeId !== undefined) {
      axios
        .get(`/api/setorUnidades/unidade/${setorUnidadeId}`)
        .then(res => {
          setSetorUnidadeList(res?.data);
        })
        .catch(err => {
          toast.error('Não foi possivel identificar sua unidade tente novamente mais tarde');
        });
    }
  }, [setorUnidadeId]);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const formattedPrazoDate = solicitacaoEntity?.prazoDate ? dayjs(solicitacaoEntity.prazoDate).format('YYYY-MM-DDTHH:mm') : '';

  return (
    <div className="solicitacao-create-container">
      <h2>Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Titulo</Label>
            <Input placeholder="Titulo" readOnly disabled value={solicitacaoEntity?.titulo} />
          </Col>

          <Col>
            <Label>Setor</Label>
            <Input type="select" value={solicitacaoEntity?.setorUnidade?.id} readOnly disabled>
              <option value={0}>Escolha um Setor</option>
              {setorUnidadeList &&
                setorUnidadeList?.map((data, key) => (
                  <>
                    <option key={key} value={data?.id}>
                      {data?.nome}
                    </option>
                  </>
                ))}
            </Input>
          </Col>

          <Col>
            <Label>Classificação</Label>
            <Input type="select" disabled readOnly value={solicitacaoEntity?.tipoSolicitacao}>
              <option value="">Tipo Solicitação</option>
              <option value="SERVICO">Serviço</option>
              <option value="MATERIAL">Material</option>
            </Input>
          </Col>

          <Col>
            <Label>Prazo</Label>
            <Input type="datetime-local" value={formattedPrazoDate} readOnly disabled />
          </Col>
        </Row>

        <Row>
          <Col className="descricao-container">
            <Label>Descrição</Label>
            <Input type="textarea" placeholder="Descrição" readOnly disabled value={solicitacaoEntity?.descricao} />
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

                    <div className="itens-container-icon" style={{ width: '10%' }}>
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

export default SolicitacaoUnidadeDetail;
