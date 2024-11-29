import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Input, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEye,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faFolderPlus,
  faWarning,
  IconDefinition,
  faSearch,
  faPen,
  faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, getStockPag } from './stock.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './stock.scss';
import axios from 'axios';
import { IStockDTO } from 'app/shared/model/StockDTO.model';
import ModalStock, { TypeModal } from 'app/shared/layout/modals/modalStock/Index';

export const Stock = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  // const stockList = useAppSelector(state => state.stock.entities);
  const loading = useAppSelector(state => state.stock.loading);
  const totalStock = useAppSelector(state => state?.stock?.totalItems);

  const [stockList, setStockList] = useState<IStockDTO[]>([]);

  const [inputPesquisa, setInputPesquisa] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [selectedStock, setSelectedStock] = useState<IStockDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const itensPorpagina = 5;

  const handleGetStock = () => {
    axios.get(`api/stocks/listaPageStock?page=${page}&size=${itensPorpagina}&pesquisa=${inputPesquisa}`).then(res => {
      setStockList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  const handlePassPagePrevious = () => {
    if (page <= 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const handlePassPageNext = () => {
    if (page + 1 >= totalStock) {
      return;
    } else {
      setPage(page + 1);
    }
  };

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: ``,
      }),
    );
    dispatch(getStockPag({ query: inputPesquisa, size: itensPorpagina, page }));
  };

  const handleReturnStyleQuantidadeContainer = (item: IStockDTO): string => {
    if (item?.quantItem <= item?.quantMax / 3) {
      return 'sheet-data-quantidade-container red';
    } else if (item?.quantItem <= item?.quantMax / 2) {
      return 'sheet-data-quantidade-container yellow';
    } else {
      return 'sheet-data-quantidade-container green';
    }
  };

  const handleReturnIconQuantidadeContainer = (item: IStockDTO): IconDefinition => {
    if (item?.quantItem <= item?.quantMax / 3 || item?.quantItem <= item?.quantMax / 2) {
      return faWarning;
    } else {
      return faCircleCheck;
    }
  };

  const handleReturnButtonSolicitacao = (data: IStockDTO) => {
    if (!data?.quantMax) return <div />;

    const isBelowThreshold = data.quantMax / 2 >= data.quantItem;
    if (!isBelowThreshold) return <div />;

    const isOpen = data.aberta;
    const buttonText = isOpen ? 'Concluir solicitação' : 'Abrir solicitação';
    const buttonIcon = isOpen ? faFolderClosed : faFolderPlus;

    return (
      <Button
        className="sheet-data-adicionar-itens-container"
        onClick={() => !isOpen && openModal(data)}
      >
        <span>{buttonText}</span>
        <FontAwesomeIcon icon={buttonIcon} />
      </Button>
    );
  };
  
  const openModal = (data: IStockDTO) => {
    setSelectedStock(data);
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleGetStock();
  }, []);

  useEffect(() => {
    handleGetStock();
  }, [inputPesquisa, page]);

  return (
    <div className="stock-home-container">
      <Row className="stock-home-header">
        <Col className="stock-home-header_title">
          <h2>Stock</h2>
        </Col>

        <Col md={3} className="stock-home-header-search-container">
          <Input placeholder="Pesquisa" value={inputPesquisa} onChange={e => setInputPesquisa(e.target.value)} />
          <Button className="search-icon-container" onClick={() => getAllEntities()}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Col>

        <Col className="stock-home-header_button">
          <Button onClick={() => navigate('new')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>

      <Row className="stock-home-data">
        {stockList && stockList?.length > 0 && (
          <div>
            <div className="header-table-container">
              <div className="header-table-data">
                <span>Titulo</span>
              </div>

              <div className="header-table-data">
                <span>Ultima Atualização</span>
              </div>

              <div className="header-table-data">
                <span>Setor</span>
              </div>

              <div className="header-table-data">
                <span>Quantidade </span>
              </div>

              <div className="header-table-data">
                <div />
              </div>

              <div className="header-table-data">
                <div />
              </div>
            </div>

            <div className="sheet-data-container">
              {stockList &&
                stockList?.map((data: IStockDTO, key) => (
                  <div className="sheet-line-data-container" key={key}>
                    <div className="sheet-data">
                      <span> {data?.nomeItem} </span>
                    </div>

                    <div className="sheet-data">
                      <TextFormat value={data.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    </div>

                    <div className="sheet-data">
                      <span> {data?.nomeSetor} </span>
                    </div>

                    <div className={handleReturnStyleQuantidadeContainer(data)}>
                      <span> {data?.quantItem}</span>
                      <FontAwesomeIcon icon={handleReturnIconQuantidadeContainer(data)} />
                    </div>

                    {handleReturnButtonSolicitacao(data)}

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.idStock}`)}>
                        <span> Visualizar</span>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>

                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.idStock}/edit`)}>
                        <span> Editar </span>
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {stockList && stockList?.length === 0 && <Alert color="info">Nenhum stock criado</Alert>}
      </Row>

      <Row className="page-container">
        <Col>
          <Button onClick={() => handlePassPagePrevious()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>

        <Col>
          <span>{`${page + 1} de ${totalPages}`}</span>
        </Col>

        <Col>
          <Button onClick={() => handlePassPageNext()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>

      {isModalOpen && selectedStock && (
        <ModalStock
          typeModal={TypeModal.abrirSolicitacao}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          data={selectedStock}
        />
      )}
    </div>
  );
};

export default Stock;
