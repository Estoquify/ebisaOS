import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './setor.reducer';

export const SetorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const setorEntity = useAppSelector(state => state.setor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="setorDetailsHeading">
          <Translate contentKey="ebisaOsApp.setor.detail.title">Setor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{setorEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="ebisaOsApp.setor.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{setorEntity.nome}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="ebisaOsApp.setor.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{setorEntity.descricao}</dd>
        </dl>
        <Button tag={Link} to="/setor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/setor/${setorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SetorDetail;
