import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './solicitacao-item.reducer';

export const SolicitacaoItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitacaoItemEntity = useAppSelector(state => state.solicitacaoItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitacaoItemDetailsHeading">
          <Translate contentKey="ebisaOsApp.solicitacaoItem.detail.title">SolicitacaoItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{solicitacaoItemEntity.id}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacaoItem.stock">Stock</Translate>
          </dt>
          <dd>{solicitacaoItemEntity.stock ? solicitacaoItemEntity.stock.id : ''}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacaoItem.solicitacao">Solicitacao</Translate>
          </dt>
          <dd>{solicitacaoItemEntity.solicitacao ? solicitacaoItemEntity.solicitacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitacao-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitacao-item/${solicitacaoItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SolicitacaoItemDetail;
