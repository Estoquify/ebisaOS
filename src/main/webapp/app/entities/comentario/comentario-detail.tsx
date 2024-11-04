import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comentario.reducer';

export const ComentarioDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const comentarioEntity = useAppSelector(state => state.comentario.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="comentarioDetailsHeading">
          <Translate contentKey="ebisaOsApp.comentario.detail.title">Comentario</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{comentarioEntity.id}</dd>
          <dt>
            <span id="respostas">
              <Translate contentKey="ebisaOsApp.comentario.respostas">Respostas</Translate>
            </span>
          </dt>
          <dd>{comentarioEntity.respostas}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="ebisaOsApp.comentario.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {comentarioEntity.createdDate ? <TextFormat value={comentarioEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="ebisaOsApp.comentario.avaliacao">Avaliacao</Translate>
          </dt>
          <dd>{comentarioEntity.avaliacao ? comentarioEntity.avaliacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comentario" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comentario/${comentarioEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ComentarioDetail;
