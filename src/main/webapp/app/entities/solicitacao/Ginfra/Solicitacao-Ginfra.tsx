import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faCheck, faX, faHourglass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '../home/solicitacao.scss';
import axios from 'axios';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';
import dayjs from 'dayjs';
import { ISolicitacaoGinfraListagem } from 'app/shared/model/solicitacao-Ginfra-listagem.model';

export const SolicitacaoGinfra = () => {
  const navigate = useNavigate();

  const [solicitacaoList, setSolicitacaoList] = useState<ISolicitacaoGinfraListagem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputPesquisa, setInputPesquisa] = useState<string>('');

  const [pageAtual, setPageAtual] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getAllEntities = () => {
    axios.get(`/api/solicitacaos/listaPageSolicitacaoAvaliacaoGInfra?page=${pageAtual}&size=${5}`).then(res => {
      setSolicitacaoList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  const handleFormatDate = (data: ISolicitacaoGinfraListagem) => {
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

      <Row className="solicitacao-ginfra-data">
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
                <span> Setor </span>
              </div>

              <div className="header-table-data">
                <span>Unidade</span>
              </div>

              <div className="header-table-data">
                <span>Data</span>
              </div>

              <div className="header-table-data">
                <div />
              </div>
            </div>

            <div className="sheet-data-container">
              {solicitacaoList &&
                solicitacaoList?.map((data: ISolicitacaoGinfraListagem, key) => (
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
                      <span> {data?.nomeSetor}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.siglaUnidade}</span>
                    </div>

                    <div className="sheet-data">
                      <span> {handleFormatDate(data)}</span>
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
        {solicitacaoList?.length === 0 && <Alert color="info">Não existem nenhuma Solicitação criada</Alert>}
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

export default SolicitacaoGinfra;
