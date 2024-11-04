import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './unidade.reducer';

export const UnidadeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const unidadeEntity = useAppSelector(state => state.unidade.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="unidadeDetailsHeading">
          <Translate contentKey="ebisaOsApp.unidade.detail.title">Unidade</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="ebisaOsApp.unidade.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.nome}</dd>
          <dt>
            <span id="cnpj">
              <Translate contentKey="ebisaOsApp.unidade.cnpj">Cnpj</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.cnpj}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.unidade.endereco">Endereco</Translate>
          </dt>
          <dd>{unidadeEntity.endereco ? unidadeEntity.endereco.id : ''}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.unidade.orgao">Orgao</Translate>
          </dt>
          <dd>{unidadeEntity.orgao ? unidadeEntity.orgao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/unidade" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/unidade/${unidadeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UnidadeDetail;
