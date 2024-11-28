import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Row, Table } from 'reactstrap';
import { TextFormat, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faEye,
  faChevronLeft,
  faChevronRight,
  faFileUpload,
  faCircleCheck,
  faFolderPlus,
  faWarning,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, getStockPag } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './stock.scss';

export const Stock = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const stockList = useAppSelector(state => state.stock.entities);
  const loading = useAppSelector(state => state.stock.loading);
  const totalStock = useAppSelector(state => state?.stock?.totalItems);
  const [imputPesquisa, setImputPesquisa] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const itensPorpagina = 5;

  const handlePassPagePrevious = () => {
    if (page <= 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const handlePassPageNext = () => {
    if (page + 1 >= 10) {
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
    dispatch(getStockPag({ query: imputPesquisa, size: itensPorpagina, page }));
  };

  const handleReturnStyleQuantidadeContainer = (item: IStock): string => {
    if (item?.quantItem <= item?.quantMax / 3) {
      return 'sheet-data-quantidade-container red';
    } else if (item?.quantItem <= item?.quantMax / 2) {
      return 'sheet-data-quantidade-container yellow';
    } else {
      return 'sheet-data-quantidade-container green';
    }
  };

  const handleReturnIconQuantidadeContainer = (item: IStock): IconDefinition => {
    if (item?.quantItem <= item?.quantMax / 3 || item?.quantItem <= item?.quantMax / 2) {
      return faWarning;
    } else {
      return faCircleCheck;
    }
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="stock-home-header">
        <Col className="stock-home-header_title">
          <h2>Stock</h2>
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
                stockList?.map((data: IStock, key) => (
                  <div className="sheet-line-data-container" key={key}>
                    <div className="sheet-data">
                      <span> {data?.item?.nomeItem} </span>
                    </div>

                    <div className="sheet-data">
                      <TextFormat value={data.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    </div>

                    <div className="sheet-data">
                      <span> {data?.setor?.nome} </span>
                    </div>

                    <div className={handleReturnStyleQuantidadeContainer(data)}>
                      <span> {data?.quantItem}</span>
                      <FontAwesomeIcon icon={handleReturnIconQuantidadeContainer(data)} />
                    </div>

                    {data?.quantMax && data?.quantMax / 2 >= data?.quantItem ? (
                      <Button className="sheet-data-adicionar-itens-container">
                        <span>Abrir solicitação</span>
                        <FontAwesomeIcon icon={faFolderPlus} />
                      </Button>
                    ) : (
                      <div />
                    )}

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}`)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {stockList && stockList?.lenght === 0 && <Alert color="info">Nenhum stock criado</Alert>}
      </Row>

      <Row className="page-container">
        <Col>
          <Button onClick={() => handlePassPagePrevious()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>

        <Col>
          <span>{`${page + 1} de ${totalStock}`}</span>
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

export default Stock;
