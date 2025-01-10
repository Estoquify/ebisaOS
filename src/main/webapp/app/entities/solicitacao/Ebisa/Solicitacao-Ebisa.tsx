import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Input, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChevronLeft, faChevronRight, faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';

import '../home/solicitacao.scss';
import axios from 'axios';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';
import dayjs from 'dayjs';
import { ISolicitacaoEbisaListagem } from 'app/shared/model/solicitacao-Ebisa-listagem.model';
import ModalEbisaComprovante from './Modal/Modal-ebisa-comprovante';

export const SolicitacaoEbisa = () => {
  const navigate = useNavigate();

  const [solicitacaoList, setSolicitacaoList] = useState<ISolicitacaoEbisaListagem[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [pageAtual, setPageAtual] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filtrarFinalizados, setFiltrarFinalizados] = useState<boolean>(false);
  const [inputPesquisa, setInputPesquisa] = useState<string>('');

  const getAllEntities = () => {
    axios
      .get(
        `/api/solicitacaos/listaPageSolicitacaoAvaliacao?page=${pageAtual}&pesquisa=${inputPesquisa}&filtrarFinalizados=${filtrarFinalizados}&size=${5}&filtrarFinalizados=${filtrarFinalizados}`,
      )
      .then(res => {
        setSolicitacaoList(res?.data?.content);
        setTotalPages(res?.data?.totalPages);
      });
  };

  useEffect(() => {
    if (!openModal) {
      getAllEntities();
    }
  }, [openModal]);

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

  const handleFormatDate = (data: ISolicitacaoEbisaListagem) => {
    const formattedDate = data?.createdDate ? dayjs(data.createdDate).format('DD/MM/YYYY') : '--------------';
    return formattedDate;
  };

  useEffect(() => {
    getAllEntities();
  }, [pageAtual, inputPesquisa, filtrarFinalizados]);

  const handleInputPesquisaChange = (data: string) => {
    setInputPesquisa(data);
    setPageAtual(0);
  };

  const handleChangeFilter = (data: string) => {
    setFiltrarFinalizados(data === "true" ? true : false);
  }

  return (
    <div className="solicitacao-home-container">
      <Row className="solicitacao-home-header">
        <Col className="solicitacao-home-header_title">
          <h2>Solicitações</h2>
        </Col>

        <Col md={2} className="stock-home-header-search-container">
          <Input
            type="select"
            placeholder="Pesquisa"
            value={`${filtrarFinalizados}`}
            onChange={e => handleChangeFilter(e.target.value)}
          >
            <option value={"false"} key={1}>
              OS abertas
              </option>
            <option value={"true"} key={2}>
              OS finalizadas
            </option>
          </Input>
        </Col>

        <Col md={3} className="stock-home-header-search-container">
          <Input placeholder="Pesquisa" value={inputPesquisa} onChange={e => handleInputPesquisaChange(e.target.value)} />
          <Button className="search-icon-container" onClick={() => getAllEntities()}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Col>
      </Row>

      <Row className="solicitacao-ebisa-data">
        {solicitacaoList && solicitacaoList?.length > 0 ? (
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
                    <ModalEbisaComprovante isOpen={openModal} setIsOpen={setOpenModal} idSolicitacao={data?.id} />
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
                      <span> {data?.siglaUnidade ? data?.siglaUnidade : 'Não informada'}</span>
                    </div>

                    <div className="sheet-data-button-container">
                      {data?.avaliacao ? (
                        <Button className="sheet-data-button" onClick={() => setOpenModal(true)}>
                          <FontAwesomeIcon icon={faCheck} />
                          <span> Concluir </span>
                        </Button>
                      ) : (
                        <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}`)}>
                          <FontAwesomeIcon icon={faEye} />
                          <span> Visualizar </span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <Alert color="info">Não existem nenhuma Solicitação criada </Alert>
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

export default SolicitacaoEbisa;
