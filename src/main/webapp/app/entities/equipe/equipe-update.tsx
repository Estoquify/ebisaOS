import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { getEntities as getColaboradors } from 'app/entities/colaborador/colaborador.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';
import { getEntity, updateEntity, createEntity, reset } from './equipe.reducer';

export const EquipeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const colaboradors = useAppSelector(state => state.colaborador.entities);
  const equipeEntity = useAppSelector(state => state.equipe.entity);
  const loading = useAppSelector(state => state.equipe.loading);
  const updating = useAppSelector(state => state.equipe.updating);
  const updateSuccess = useAppSelector(state => state.equipe.updateSuccess);

  const handleClose = () => {
    navigate('/equipe');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getColaboradors({}));
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
      ...equipeEntity,
      ...values,
      colaborador: colaboradors.find(it => it.id.toString() === values.colaborador?.toString()),
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
          ...equipeEntity,
          colaborador: equipeEntity?.colaborador?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.equipe.home.createOrEditLabel" data-cy="EquipeCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.equipe.home.createOrEditLabel">Create or edit a Equipe</Translate>
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
                  id="equipe-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.equipe.apelido')}
                id="equipe-apelido"
                name="apelido"
                data-cy="apelido"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.equipe.descricao')}
                id="equipe-descricao"
                name="descricao"
                data-cy="descricao"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.equipe.ocupada')}
                id="equipe-ocupada"
                name="ocupada"
                data-cy="ocupada"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('ebisaOsApp.equipe.ativa')}
                id="equipe-ativa"
                name="ativa"
                data-cy="ativa"
                check
                type="checkbox"
              />
              <ValidatedField
                id="equipe-colaborador"
                name="colaborador"
                data-cy="colaborador"
                label={translate('ebisaOsApp.equipe.colaborador')}
                type="select"
              >
                <option value="" key="0" />
                {colaboradors
                  ? colaboradors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/equipe" replace color="info">
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

export default EquipeUpdate;
