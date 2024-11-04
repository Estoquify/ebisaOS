import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './equipe.reducer';

export const EquipeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const equipeEntity = useAppSelector(state => state.equipe.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="equipeDetailsHeading">
          <Translate contentKey="ebisaOsApp.equipe.detail.title">Equipe</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.id}</dd>
          <dt>
            <span id="apelido">
              <Translate contentKey="ebisaOsApp.equipe.apelido">Apelido</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.apelido}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="ebisaOsApp.equipe.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.descricao}</dd>
          <dt>
            <span id="ocupada">
              <Translate contentKey="ebisaOsApp.equipe.ocupada">Ocupada</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.ocupada ? 'true' : 'false'}</dd>
          <dt>
            <span id="ativa">
              <Translate contentKey="ebisaOsApp.equipe.ativa">Ativa</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.ativa ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.equipe.colaborador">Colaborador</Translate>
          </dt>
          <dd>{equipeEntity.colaborador ? equipeEntity.colaborador.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/equipe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/equipe/${equipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EquipeDetail;
