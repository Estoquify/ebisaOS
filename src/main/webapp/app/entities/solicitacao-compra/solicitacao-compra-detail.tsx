import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './solicitacao-compra.reducer';

export const SolicitacaoCompraDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitacaoCompraEntity = useAppSelector(state => state.solicitacaoCompra.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitacaoCompraDetailsHeading">
          <Translate contentKey="ebisaOsApp.solicitacaoCompra.detail.title">SolicitacaoCompra</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{solicitacaoCompraEntity.id}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="ebisaOsApp.solicitacaoCompra.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{solicitacaoCompraEntity.descricao}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="ebisaOsApp.solicitacaoCompra.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoCompraEntity.createDate ? (
              <TextFormat value={solicitacaoCompraEntity.createDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="aberta">
              <Translate contentKey="ebisaOsApp.solicitacaoCompra.aberta">Aberta</Translate>
            </span>
          </dt>
          <dd>{solicitacaoCompraEntity.aberta ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacaoCompra.stock">Stock</Translate>
          </dt>
          <dd>{solicitacaoCompraEntity.stock ? solicitacaoCompraEntity.stock.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitacao-compra" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitacao-compra/${solicitacaoCompraEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SolicitacaoCompraDetail;
