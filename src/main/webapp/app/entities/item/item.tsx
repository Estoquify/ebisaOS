import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Input, Row, Table } from 'reactstrap';
import { TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEye, faPen, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IItem } from 'app/shared/model/item.model';

import './item.scss';
import axios from 'axios';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';

export const Item = () => {
  const navigate = useNavigate();

  const [inputPesquisa, setInputPesquisa] = useState<string>('');
  const [itemList, setItemList] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itensPorpagina = 5;

  const getAllEntitites = () => {
    axios.get(`/api/items/listaPageItem?page=${page}&size=${itensPorpagina}`).then(res => {
      setItemList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  useEffect(() => {
    getAllEntitites()
  }, [page])

  useEffect(() => {
    getAllEntitites();
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="stock-home-header">
        <Col className="stock-home-header_title">
          <h2>Itens</h2>
        </Col>

        {/* <Col md={3} className="stock-home-header-search-container">
          <Input placeholder="Pesquisa" value={inputPesquisa} onChange={e => setInputPesquisa(e.target.value)} />
          <Button className="search-icon-container" onClick={() => getAllEntitites()}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Col> */}

        <Col className="stock-home-header_button">
          <Button onClick={() => navigate('new')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>

      <Row className="stock-home-data">
        {itemList && itemList?.length > 0 && (
          <div>
            <div className="header-table-container-iten">
              <div className="header-table-data">
                <span>Nome item</span>
              </div>

              <div className="header-table-data">
                <span>Data De Criação</span>
              </div>

              <div className="header-table-data">
                <span>Ultima Atualização</span>
              </div>

              <div className="header-table-data"></div>
            </div>

            <div className="sheet-data-container">
              {itemList &&
                itemList?.map((data: IItem, key) => (
                  <div className="sheet-line-data-container-iten" key={key}>
                    <div className="sheet-data">
                      <span> {data?.nomeItem} </span>
                    </div>

                    <div className="sheet-data">
                      <TextFormat value={data?.createdDate?.toString()} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    </div>

                    <div className="sheet-data">
                      <TextFormat value={data?.lastModifiedDate?.toString()} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    </div>

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}`)}>
                        <span> Visualizar</span>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>

                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}/edit`)}>
                        <span> Editar </span>
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {itemList && itemList?.length === 0 && <Alert color="info">Nenhum Item Cadastrado</Alert>}
      </Row>

      <Row className="page-container">
        <Col>
          <Button onClick={() => handlePassPagePrevious(setPage, page)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>

        <Col>
          <span>{`${page + 1} de ${totalPages}`}</span>
        </Col>

        <Col>
          <Button onClick={() => handlePassPageNext(setPage, page, totalPages)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Item;
