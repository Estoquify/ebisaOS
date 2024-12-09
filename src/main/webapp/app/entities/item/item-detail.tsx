import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

export const ItemDetail = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);
  
  const handleClose = () => {
    dispatch(reset());
    navigate('/item');
  };

  const itemEntity: IItem = useAppSelector(state => state.item.entity);
  return (
    <div className="stock-update-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">
            Visualizar Item: {itemEntity?.nomeItem}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <>
            <Row>
              <Col>
                <Label>Nome Item</Label>
                <Input placeholder="Quantidade Item" value={itemEntity?.nomeItem} disabled readOnly />
              </Col>

              <Col>
                <Label>Data Criação</Label>
                <Input
                  id="createDate"
                  placeholder="Data de criação"
                  value={itemEntity?.createdDate ? dayjs(itemEntity.createdDate).format('DD/MM/YYYY') : '-'}
                  disabled
                  readOnly
                />
              </Col>

              <Col>
                <Label>Data Ultima Atualização</Label>
                <Input
                  id="updatedDate"
                  placeholder="Última atualização"
                  value={itemEntity?.lastModifiedDate ? dayjs(itemEntity.lastModifiedDate).format('DD/MM/YYYY') : '-'}
                  disabled
                  readOnly
                />
              </Col>
            </Row>

            <Row className="buttons-container">
              <Col>
                <Button onClick={() => handleClose()}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span> Voltar </span>
                </Button>
              </Col>

              <Col>
                <Button tag={Link} to={`/item/${itemEntity.id}/edit`}>
                  <span> Editar </span>
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default ItemDetail;
