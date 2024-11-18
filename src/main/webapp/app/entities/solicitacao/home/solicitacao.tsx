import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faEye,
  faCheck,
  faX,
  faHourglass,
  faPen,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from '../solicitacao.reducer';

import './solicitacao.scss';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';

export const Solicitacao = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const solicitacaoList: Array<ISolicitacao> = useAppSelector(state => state.solicitacao.entities);
  const loading = useAppSelector(state => state.solicitacao.loading);

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const [pageAtual, setPageAtual] = useState<number>(0);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  const handleReturnPrioridade = (status: boolean) => {
    switch (status) {
      case true:
        return 'sheet-data-prioridade-green';
      case false:
        return 'sheet-data-prioridade-red';
      default:
        return 'sheet-data-prioridade-yellow';
    }
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

  const handlePassPagePrevious = () => {
    if (pageAtual <= 0) {
      return;
    } else {
      setPageAtual(pageAtual - 1);
    }
  };

  const handlePassPageNext = () => {
    if ((pageAtual + 1) >= 10) {
      return;
    } else {
      setPageAtual(pageAtual + 1);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

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
                <span>Prioridade</span>
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
                    <div className={handleReturnPrioridade(data?.prioridade)}>
                      <div> </div>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.titulo} </span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.tipoSolicitacao}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.createDate.format(APP_LOCAL_DATE_FORMAT)}</span>
                    </div>

                    <div className="sheet-data-status-container">
                      <div className={handleReturnStatus(data?.aberta)}>
                        <FontAwesomeIcon icon={handleReturnStatusIcons(data?.aberta)} />
                      </div>
                    </div>

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button">
                        <FontAwesomeIcon icon={data?.aberta ? faEye : faPen} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <Alert color="info">Nenhuma Solicitação criada</Alert>
      </Row>

      <Row className="page-container">
        <Col>
          <Button onClick={() => handlePassPagePrevious()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>

        <Col>
          <span>{`${pageAtual + 1} de ${10}`}</span>
        </Col>

        <Col>
          <Button onClick={() => handlePassPageNext()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Solicitacao;
