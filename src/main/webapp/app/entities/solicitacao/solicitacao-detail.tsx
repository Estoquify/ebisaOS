import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './solicitacao.reducer';

export const SolicitacaoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitacaoEntity = useAppSelector(state => state.solicitacao.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitacaoDetailsHeading">
          <Translate contentKey="ebisaOsApp.solicitacao.detail.title">Solicitacao</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.id}</dd>
          <dt>
            <span id="prazoDate">
              <Translate contentKey="ebisaOsApp.solicitacao.prazoDate">Prazo Date</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoEntity.prazoDate ? <TextFormat value={solicitacaoEntity.prazoDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="ebisaOsApp.solicitacao.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoEntity.createDate ? <TextFormat value={solicitacaoEntity.createDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="ebisaOsApp.solicitacao.updatedDate">Updated Date</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoEntity.updatedDate ? (
              <TextFormat value={solicitacaoEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="finishDate">
              <Translate contentKey="ebisaOsApp.solicitacao.finishDate">Finish Date</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoEntity.finishDate ? <TextFormat value={solicitacaoEntity.finishDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="aberta">
              <Translate contentKey="ebisaOsApp.solicitacao.aberta">Aberta</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.aberta ? 'true' : 'false'}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="ebisaOsApp.solicitacao.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.descricao}</dd>
          <dt>
            <span id="observacao">
              <Translate contentKey="ebisaOsApp.solicitacao.observacao">Observacao</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.observacao}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacao.unidade">Unidade</Translate>
          </dt>
          <dd>{solicitacaoEntity.unidade ? solicitacaoEntity.unidade.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitacao" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitacao/${solicitacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SolicitacaoDetail;
