import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES, TIPOSCOMENTARIOS } from 'app/config/constants';
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
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import { IComentarioView } from 'app/shared/model/comentarios-view.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ChatComponent from '../view/Chat/ChatComponent';

export const SolicitacaoUnidadeDetail = () => {
  const navigate = useNavigate();

  const isUnidade = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.UNIDADE]));
  const isEbisa = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.EBISA]));
  const isGinfra = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.GINFRA]));

  const setorUnidadeId = useAppSelector(state => state?.authentication?.account?.setorUnidade?.id);

  const [solicitacaoViewServico, setSolicitacaoViewServico] = useState<ISolicitacaoViewServicoDto>({});

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
    navigate(`./edit`)
  }

  return (
    <div className="solicitacao-create-container">
      <h2>Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Titulo</Label>
            <Input placeholder="Titulo" readOnly disabled value={solicitacaoViewServico?.solicitacao?.titulo} />
          </Col>

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
            <Label>Classificação</Label>
            <Input type="select" disabled readOnly value={solicitacaoViewServico?.solicitacao?.tipoSolicitacao}>
              <option value="">Tipo Solicitação</option>
              <option value="SERVICO">Serviço</option>
              <option value="MATERIAL">Material</option>
            </Input>
          </Col>
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

          {solicitacaoViewServico?.foiAvaliado && <ChatComponent solicitacaoViewServico={solicitacaoViewServico} isEbisa={isEbisa} isGinfra={isGinfra} isUnidade={isUnidade} />}
        </Row>
      </div>

      <div className="buttons-container">
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span> Voltar </span>
        </Button>

        {/* <Button onClick={() => handleButtonClick()} disabled={solicitacaoViewServico?.foiAvaliado === false} >
          <span> Editar </span>
          <FontAwesomeIcon icon={faPen} />
        </Button> */}
      </div>
    </div>
  );
};

export default SolicitacaoUnidadeDetail;
