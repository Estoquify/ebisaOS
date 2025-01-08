import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faCheck, faX, faHourglass, faPen, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from '../solicitacao.reducer';

import '../home/solicitacao.scss';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import axios from 'axios';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';
import dayjs from 'dayjs';

export const SolicitacaoUnidade = () => {
  const navigate = useNavigate();
  const setorUnidadeId = useAppSelector(state => state?.authentication?.account?.setorUnidade?.id);

  const [solicitacaoList, setSolicitacaoList] = useState<ISolicitacao[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [inputPesquisa, setInputPesquisa] = useState<string>('');

  const [pageAtual, setPageAtual] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getAllEntities = () => {
    axios.get(`/api/solicitacaos/listaPageSolicitacaoUnidade?page=${pageAtual}&size=${10}&idUnidade=${setorUnidadeId}`).then(res => {
      setSolicitacaoList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  const handleReturnStatus = (status: boolean) => {
    switch (status) {
      case true:
        return 'sheet-data-status-accept';

      case false:
        return 'sheet-data-status-rejected';

      default:
        return 'sheet-data-status-waiting';
    }
  };

  const handleReturnStatusIcons = (status: boolean) => {
    switch (status) {
      case true:
        return faCheck;

      case false:
        return faX;

      default:
        return faHourglass;
    }
  };

  const handleNavigateByStatus = (data: ISolicitacao) => {
    if (data?.aberta) {
      navigate(`./${data?.id}`);
    } else {
      navigate(`./edit/${data.id}`);
    }
  };

  const handleFormatDate = (data: ISolicitacao) => {
    const formattedDate = data?.createdDate ? dayjs(data.createdDate).format('DD/MM/YYYY') : '--------------';
    return formattedDate;
  };

  useEffect(() => {
    getAllEntities();
  }, [pageAtual]);

  return (
    <div className="solicitacao-home-container">
      <Row className="solicitacao-home-header">
        <Col className="solicitacao-home-header_title">
          <h2>Solicitações</h2>
        </Col>

        <Col className="solicitacao-home-header_button">
          <Button onClick={() => navigate('new')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>

      <Row className="solicitacao-home-data">
        {solicitacaoList && solicitacaoList?.length > 0 && (
          <div>
            <div className="header-table-container">
              <div className="header-table-data">
                <span>Id</span>
              </div>

              <div className="header-table-data">
                <span>Titulo</span>
              </div>

              <div className="header-table-data">
                <span>Tipo</span>
              </div>

              <div className="header-table-data">
                <span>Data</span>
              </div>

              <div className="header-table-data">
                <span>Status</span>
              </div>

              <div className="header-table-data">
                <div />
              </div>
            </div>

            <div className="sheet-data-container">
              {solicitacaoList &&
                solicitacaoList?.map((data: ISolicitacao, key) => (
                  <div className="sheet-line-data-container" key={key}>
                    <div className="sheet-data">
                      <div>{data?.id}</div>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.titulo} </span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.tipoSolicitacao}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {handleFormatDate(data)}</span>
                    </div>

                    <div className="sheet-data-status-container">
                      <div
                        className={handleReturnStatus(data?.aprovacao)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FontAwesomeIcon icon={handleReturnStatusIcons(data?.aprovacao)} />
                      </div>
                    </div>

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => handleNavigateByStatus(data)}>
                        {data?.aprovacao === false && (
                          <>
                            <FontAwesomeIcon icon={faPen} />
                            <span> Editar </span>
                          </>
                        )}
                        {data?.aprovacao !== false && (
                          <>
                            <FontAwesomeIcon icon={faEye} />
                            <span> Visualizar </span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}

              {solicitacaoList?.length === 0 && <Alert color="info">Não existem nenhuma Solicitação criada</Alert>}
            </div>
          </div>
        )}
      </Row>

      {solicitacaoList?.length > 0 && (
        <Row className="page-container">
          <Col>
            <Button onClick={() => handlePassPagePrevious(setPageAtual, pageAtual)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          </Col>

          <Col>
            <span>{`${pageAtual + 1} de ${totalPages}`}</span>
          </Col>

          <Col>
            <Button onClick={() => handlePassPageNext(setPageAtual, pageAtual, totalPages)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SolicitacaoUnidade;
