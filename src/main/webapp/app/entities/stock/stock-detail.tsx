import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';

export const StockDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const stockEntity: IStock = useAppSelector(state => state.stock.entity);
  return (
    <div className="stock-update-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">
            Visualizar stock de {stockEntity?.item?.nomeItem} do setor {stockEntity?.setor?.nome}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <>
            <Row>
              <Col>
                <Label>Quantidade Item</Label>
                <Input placeholder="Quantidade Item" value={stockEntity?.quantItem} disabled readOnly />
              </Col>

              <Col>
                <Label>Quantidade Item Maxima</Label>
                <Input placeholder="Quantidade Item" value={stockEntity?.quantMax} disabled readOnly />
              </Col>
            </Row>

            <Row>
              <Col>
                <Label>Stock Item</Label>
                <Input placeholder="Item" type="text" value={stockEntity?.item?.nomeItem} disabled readOnly />
              </Col>
              <Col>
                <Label>Stock Setor</Label>
                <Input placeholder="Item" type="text" value={stockEntity?.setor?.nome} disabled readOnly />
              </Col>
            </Row>

            <Row className="buttons-container">
              <Col>
                <Button tag={Link} to="/stock">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span> Voltar </span>
                </Button>
              </Col>

              <Col>
                <Button tag={Link} to={`/stock/${stockEntity.id}/edit`}>
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

export default StockDetail;
