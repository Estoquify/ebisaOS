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
import { useAppDispatch, useAppSelector } from 'app/config/store';

import '../home/solicitacao.scss';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import axios from 'axios';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';
import dayjs from 'dayjs';
import { ISolicitacaoEbisaListagem } from 'app/shared/model/solicitacao-Ebisa-listagem.model';

export const SolicitacaoEbisa = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [solicitacaoList, setSolicitacaoList] = useState<ISolicitacaoEbisaListagem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputPesquisa, setInputPesquisa] = useState<string>('');

  const [pageAtual, setPageAtual] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getAllEntities = () => {
    axios.get(`/api/solicitacaos/listaPageSolicitacaoAvaliacao?page=${pageAtual}&size=${5}`).then(res => {
      setSolicitacaoList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  const handleReturnPrioridade = (status: number | string) => {
    switch (status) {
      case 3:
        return 'sheet-data-prioridade-green';
      case 1:
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

  const handleFormatDate = (data: ISolicitacaoEbisaListagem) => {
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

        {/* <Col className="solicitacao-home-header_button">
          <Button onClick={() => navigate('new')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col> */}
      </Row>

      <Row className="solicitacao-ebisa-data">
        {solicitacaoList && solicitacaoList?.length > 0 && (
          <div>
            <div className="header-table-container">
              <div className="header-table-data">
                <span>Prioridade</span>
              </div>

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
                <span> Setor </span>
              </div>

              <div className="header-table-data">
                <span>Data</span>
              </div>

              <div className="header-table-data">
                <span>Unidade</span>
              </div>

              <div className="header-table-data">
                <div />
              </div>
            </div>

            <div className="sheet-data-container">
              {solicitacaoList &&
                solicitacaoList?.map((data: ISolicitacaoEbisaListagem, key) => (
                  <div className="sheet-line-data-container" key={key}>
                    <div className={handleReturnPrioridade(data?.prioridade)}>
                      <div> </div>
                    </div>

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
                      <span> {data?.nomeSetor}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {handleFormatDate(data)}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.siglaUnidade ? data?.siglaUnidade : "Não informada"}</span>
                    </div>

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}`)}>
                        <FontAwesomeIcon icon={faEye} />
                        <span> Visualizar </span>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Row>

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
    </div>
  );
};

export default SolicitacaoEbisa;
