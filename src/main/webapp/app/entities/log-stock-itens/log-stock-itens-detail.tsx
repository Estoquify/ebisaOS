import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './log-stock-itens.reducer';

export const LogStockItensDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const logStockItensEntity = useAppSelector(state => state.logStockItens.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="logStockItensDetailsHeading">
          <Translate contentKey="ebisaOsApp.logStockItens.detail.title">LogStockItens</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{logStockItensEntity.id}</dd>
          <dt>
            <span id="createDade">
              <Translate contentKey="ebisaOsApp.logStockItens.createDade">Create Dade</Translate>
            </span>
          </dt>
          <dd>
            {logStockItensEntity.createDade ? (
              <TextFormat value={logStockItensEntity.createDade} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="quantAtual">
              <Translate contentKey="ebisaOsApp.logStockItens.quantAtual">Quant Atual</Translate>
            </span>
          </dt>
          <dd>{logStockItensEntity.quantAtual}</dd>
          <dt>
            <span id="quantAnterior">
              <Translate contentKey="ebisaOsApp.logStockItens.quantAnterior">Quant Anterior</Translate>
            </span>
          </dt>
          <dd>{logStockItensEntity.quantAnterior}</dd>
          <dt>
            <span id="updateDate">
              <Translate contentKey="ebisaOsApp.logStockItens.updateDate">Update Date</Translate>
            </span>
          </dt>
          <dd>
            {logStockItensEntity.updateDate ? (
              <TextFormat value={logStockItensEntity.updateDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ebisaOsApp.logStockItens.stock">Stock</Translate>
          </dt>
          <dd>{logStockItensEntity.stock ? logStockItensEntity.stock.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/log-stock-itens" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/log-stock-itens/${logStockItensEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LogStockItensDetail;
