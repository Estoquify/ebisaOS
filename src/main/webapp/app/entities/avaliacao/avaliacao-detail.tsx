import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './avaliacao.reducer';

export const AvaliacaoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const avaliacaoEntity = useAppSelector(state => state.avaliacao.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="avaliacaoDetailsHeading">
          <Translate contentKey="ebisaOsApp.avaliacao.detail.title">Avaliacao</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{avaliacaoEntity.id}</dd>
          <dt>
            <span id="avalicao">
              <Translate contentKey="ebisaOsApp.avaliacao.avalicao">Avalicao</Translate>
            </span>
          </dt>
          <dd>{avaliacaoEntity.avalicao}</dd>
          <dt>
            <span id="aprovacao">
              <Translate contentKey="ebisaOsApp.avaliacao.aprovacao">Aprovacao</Translate>
            </span>
          </dt>
          <dd>{avaliacaoEntity.aprovacao ? 'true' : 'false'}</dd>
          <dt>
            <span id="creatDate">
              <Translate contentKey="ebisaOsApp.avaliacao.creatDate">Creat Date</Translate>
            </span>
          </dt>
          <dd>
            {avaliacaoEntity.creatDate ? <TextFormat value={avaliacaoEntity.creatDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="ebisaOsApp.avaliacao.solicitacao">Solicitacao</Translate>
          </dt>
          <dd>{avaliacaoEntity.solicitacao ? avaliacaoEntity.solicitacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/avaliacao" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/avaliacao/${avaliacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AvaliacaoDetail;
