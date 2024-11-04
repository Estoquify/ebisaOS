import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './endereco.reducer';

export const EnderecoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const enderecoEntity = useAppSelector(state => state.endereco.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="enderecoDetailsHeading">
          <Translate contentKey="ebisaOsApp.endereco.detail.title">Endereco</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.id}</dd>
          <dt>
            <span id="logradouro">
              <Translate contentKey="ebisaOsApp.endereco.logradouro">Logradouro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.logradouro}</dd>
          <dt>
            <span id="cep">
              <Translate contentKey="ebisaOsApp.endereco.cep">Cep</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.cep}</dd>
          <dt>
            <span id="numero">
              <Translate contentKey="ebisaOsApp.endereco.numero">Numero</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.numero}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="ebisaOsApp.endereco.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.bairro}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.endereco.municipio">Municipio</Translate>
          </dt>
          <dd>{enderecoEntity.municipio ? enderecoEntity.municipio.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/endereco" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/endereco/${enderecoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EnderecoDetail;
