import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './colaborador.reducer';

export const ColaboradorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const colaboradorEntity = useAppSelector(state => state.colaborador.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="colaboradorDetailsHeading">
          <Translate contentKey="ebisaOsApp.colaborador.detail.title">Colaborador</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{colaboradorEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="ebisaOsApp.colaborador.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{colaboradorEntity.nome}</dd>
          <dt>
            <span id="cpf">
              <Translate contentKey="ebisaOsApp.colaborador.cpf">Cpf</Translate>
            </span>
          </dt>
          <dd>{colaboradorEntity.cpf}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.colaborador.funcao">Funcao</Translate>
          </dt>
          <dd>{colaboradorEntity.funcao ? colaboradorEntity.funcao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/colaborador" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/colaborador/${colaboradorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ColaboradorDetail;
