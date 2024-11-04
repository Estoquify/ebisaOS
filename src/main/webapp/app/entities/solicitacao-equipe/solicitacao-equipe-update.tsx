import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEquipe } from 'app/shared/model/equipe.model';
import { getEntities as getEquipes } from 'app/entities/equipe/equipe.reducer';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { getEntities as getSolicitacaos } from 'app/entities/solicitacao/solicitacao.reducer';
import { ISolicitacaoEquipe } from 'app/shared/model/solicitacao-equipe.model';
import { getEntity, updateEntity, createEntity, reset } from './solicitacao-equipe.reducer';

export const SolicitacaoEquipeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const equipes = useAppSelector(state => state.equipe.entities);
  const solicitacaos = useAppSelector(state => state.solicitacao.entities);
  const solicitacaoEquipeEntity = useAppSelector(state => state.solicitacaoEquipe.entity);
  const loading = useAppSelector(state => state.solicitacaoEquipe.loading);
  const updating = useAppSelector(state => state.solicitacaoEquipe.updating);
  const updateSuccess = useAppSelector(state => state.solicitacaoEquipe.updateSuccess);

  const handleClose = () => {
    navigate('/solicitacao-equipe');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEquipes({}));
    dispatch(getSolicitacaos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...solicitacaoEquipeEntity,
      ...values,
      equipe: equipes.find(it => it.id.toString() === values.equipe?.toString()),
      solicitacao: solicitacaos.find(it => it.id.toString() === values.solicitacao?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...solicitacaoEquipeEntity,
          equipe: solicitacaoEquipeEntity?.equipe?.id,
          solicitacao: solicitacaoEquipeEntity?.solicitacao?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.solicitacaoEquipe.home.createOrEditLabel" data-cy="SolicitacaoEquipeCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.solicitacaoEquipe.home.createOrEditLabel">Create or edit a SolicitacaoEquipe</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="solicitacao-equipe-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="solicitacao-equipe-equipe"
                name="equipe"
                data-cy="equipe"
                label={translate('ebisaOsApp.solicitacaoEquipe.equipe')}
                type="select"
              >
                <option value="" key="0" />
                {equipes
                  ? equipes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="solicitacao-equipe-solicitacao"
                name="solicitacao"
                data-cy="solicitacao"
                label={translate('ebisaOsApp.solicitacaoEquipe.solicitacao')}
                type="select"
              >
                <option value="" key="0" />
                {solicitacaos
                  ? solicitacaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/solicitacao-equipe" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SolicitacaoEquipeUpdate;
