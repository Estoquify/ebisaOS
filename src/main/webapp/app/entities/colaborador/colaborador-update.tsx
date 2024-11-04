import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFuncao } from 'app/shared/model/funcao.model';
import { getEntities as getFuncaos } from 'app/entities/funcao/funcao.reducer';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { getEntity, updateEntity, createEntity, reset } from './colaborador.reducer';

export const ColaboradorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const funcaos = useAppSelector(state => state.funcao.entities);
  const colaboradorEntity = useAppSelector(state => state.colaborador.entity);
  const loading = useAppSelector(state => state.colaborador.loading);
  const updating = useAppSelector(state => state.colaborador.updating);
  const updateSuccess = useAppSelector(state => state.colaborador.updateSuccess);

  const handleClose = () => {
    navigate('/colaborador');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFuncaos({}));
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
      ...colaboradorEntity,
      ...values,
      funcao: funcaos.find(it => it.id.toString() === values.funcao?.toString()),
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
          ...colaboradorEntity,
          funcao: colaboradorEntity?.funcao?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.colaborador.home.createOrEditLabel" data-cy="ColaboradorCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.colaborador.home.createOrEditLabel">Create or edit a Colaborador</Translate>
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
                  id="colaborador-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.colaborador.nome')}
                id="colaborador-nome"
                name="nome"
                data-cy="nome"
                type="text"
              />
              <ValidatedField label={translate('ebisaOsApp.colaborador.cpf')} id="colaborador-cpf" name="cpf" data-cy="cpf" type="text" />
              <ValidatedField
                id="colaborador-funcao"
                name="funcao"
                data-cy="funcao"
                label={translate('ebisaOsApp.colaborador.funcao')}
                type="select"
              >
                <option value="" key="0" />
                {funcaos
                  ? funcaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/colaborador" replace color="info">
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

export default ColaboradorUpdate;
