import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './solicitacao-equipe.reducer';

export const SolicitacaoEquipeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const solicitacaoEquipeEntity = useAppSelector(state => state.solicitacaoEquipe.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitacaoEquipeDetailsHeading">
          <Translate contentKey="ebisaOsApp.solicitacaoEquipe.detail.title">SolicitacaoEquipe</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEquipeEntity.id}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacaoEquipe.equipe">Equipe</Translate>
          </dt>
          <dd>{solicitacaoEquipeEntity.equipe ? solicitacaoEquipeEntity.equipe.id : ''}</dd>
          <dt>
            <Translate contentKey="ebisaOsApp.solicitacaoEquipe.solicitacao">Solicitacao</Translate>
          </dt>
          <dd>{solicitacaoEquipeEntity.solicitacao ? solicitacaoEquipeEntity.solicitacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitacao-equipe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitacao-equipe/${solicitacaoEquipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SolicitacaoEquipeDetail;
