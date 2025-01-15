import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES, TIPOSCOMENTARIOS } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from '../solicitacao.reducer';
import {
  faCheckSquare,
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
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import { IComentarioView } from 'app/shared/model/comentarios-view.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ChatComponent from '../view/Chat/ChatComponent';
import ModalIndex from './Modal/Modal-index';

export const SolicitacaoGinfraDetail = () => {
  const navigate = useNavigate();

  const isUnidade = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.UNIDADE]));
  const isEbisa = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.EBISA]));
  const isGinfra = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.GINFRA]));

  const setorUnidadeId = useAppSelector(state => state?.authentication?.account?.setorUnidade?.id);

  const [solicitacaoViewServico, setSolicitacaoViewServico] = useState<ISolicitacaoViewServicoDto>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    axios
      .get(`/api/solicitacaos/solicitacaoViewServico/${id}`)
      .then(res => {
        setSolicitacaoViewServico(res?.data);
      })
      .catch(err => {});
  }, []);

  const formattedPrazoDate = solicitacaoViewServico?.solicitacao?.prazoDate
    ? dayjs(solicitacaoViewServico?.solicitacao.prazoDate).format('YYYY-MM-DDTHH:mm')
    : '';

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleReturnAvaliarButton = (): boolean => {
    if (!solicitacaoViewServico?.foiAvaliado) {
      return true
    }

    if (!solicitacaoViewServico?.avaliacaoOrcamento && solicitacaoViewServico?.orcamentoAberto) {
      return true
    }

    return false
  }

  return (
    <div className="solicitacao-create-container">
      <h2>Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Solicitante</Label>
            <Input placeholder="Solicitante" readOnly disabled value={solicitacaoViewServico?.solicitacao?.createdBy} />
          </Col>

          <Col>
            <Label>Titulo</Label>
            <Input placeholder="Titulo" readOnly disabled value={solicitacaoViewServico?.solicitacao?.titulo} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>Setor</Label>
            <Input type="select" value={solicitacaoViewServico?.solicitacao?.setorUnidade?.id} readOnly disabled>
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
            <Label>Unidade</Label>
            <Input type="select" value={solicitacaoViewServico?.solicitacao?.setorUnidade?.unidade?.id} readOnly disabled>
              <option value={0}>Escolha um Unidade</option>
              {setorUnidadeList &&
                setorUnidadeList?.map((data, key) => (
                  <>
                    <option key={key} value={data?.unidade?.id}>
                      {data?.unidade?.nome}
                    </option>
                  </>
                ))}
            </Input>
          </Col>

          <Col>
            <Label>Classificação</Label>
            <Input type="select" disabled readOnly value={solicitacaoViewServico?.solicitacao?.tipoSolicitacao}>
              <option value="">Tipo Solicitação</option>
              <option value="SERVICO">Serviço</option>
              <option value="MATERIAL">Material</option>
            </Input>
          </Col>

          {formattedPrazoDate && (
            <Col>
              <Label>Prazo</Label>
              <Input type="datetime-local" value={formattedPrazoDate} readOnly disabled />
            </Col>
          )}
        </Row>

        <Row>
          <Col className="descricao-container">
            <Label>Descrição</Label>
            <Input type="textarea" placeholder="Descrição" readOnly disabled value={solicitacaoViewServico?.solicitacao?.descricao} />
          </Col>

          {solicitacaoViewServico && solicitacaoViewServico?.equipes && solicitacaoViewServico?.equipes?.length > 0 && (
            <Col>
              <div className="inventario-container">
                <span>Equipe</span>

                <div className="inventario-container-data">
                  <div className="inventario-container_search-box">
                    <div>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <Input type="text" placeholder="Pesquisa" />
                  </div>

                  <div className="itens-list">
                    {solicitacaoViewServico &&
                      solicitacaoViewServico?.equipes &&
                      solicitacaoViewServico?.equipes?.map((data, key) => (
                        <React.Fragment key={key}>
                          <div className="itens-container">
                            <div className="itens-container-text">
                              <span>{data?.apelido}</span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </div>
            </Col>
          )}

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
                  {solicitacaoViewServico &&
                    solicitacaoViewServico?.itens &&
                    solicitacaoViewServico?.itens?.map((data, key) => (
                      <React.Fragment key={key}>
                        <div className="itens-container">
                          <div className="itens-container-text">
                            <span>{data?.item?.nomeItem}</span>
                          </div>

                          <div className="itens-container-icon" style={{ width: '10%' }}>
                            <span>{data?.quantidade}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </Col>

          {solicitacaoViewServico?.foiAvaliado && (
            <ChatComponent solicitacaoViewServico={solicitacaoViewServico} isEbisa={isEbisa} isGinfra={isGinfra} isUnidade={isUnidade} />
          )}
        </Row>
      </div>

      <div className="buttons-container">
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span> Voltar </span>
        </Button>

        {handleReturnAvaliarButton() && (
          <Button onClick={() => handleButtonClick()}>
            <span> Avaliar </span>
            <FontAwesomeIcon icon={faCheckSquare} />
          </Button>
        )}
      </div>
      <ModalIndex isOpen={isModalOpen} setIsOpen={setIsModalOpen} dataAvaliacao={solicitacaoViewServico} />
    </div>
  );
};

export default SolicitacaoGinfraDetail;
