import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUnidade } from 'app/shared/model/unidade.model';
import { getEntities as getUnidades } from 'app/entities/unidade/unidade.reducer';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { getEntity, updateEntity, createEntity, reset } from './solicitacao.reducer';

export const SolicitacaoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const unidades = useAppSelector(state => state.unidade.entities);
  const solicitacaoEntity = useAppSelector(state => state.solicitacao.entity);
  const loading = useAppSelector(state => state.solicitacao.loading);
  const updating = useAppSelector(state => state.solicitacao.updating);
  const updateSuccess = useAppSelector(state => state.solicitacao.updateSuccess);

  const handleClose = () => {
    navigate('/solicitacao');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUnidades({}));
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
    values.prazoDate = convertDateTimeToServer(values.prazoDate);
    values.createDate = convertDateTimeToServer(values.createDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);
    values.finishDate = convertDateTimeToServer(values.finishDate);

    const entity = {
      ...solicitacaoEntity,
      ...values,
      unidade: unidades.find(it => it.id.toString() === values.unidade?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          prazoDate: displayDefaultDateTime(),
          createDate: displayDefaultDateTime(),
          updatedDate: displayDefaultDateTime(),
          finishDate: displayDefaultDateTime(),
        }
      : {
          ...solicitacaoEntity,
          prazoDate: convertDateTimeFromServer(solicitacaoEntity.prazoDate),
          createDate: convertDateTimeFromServer(solicitacaoEntity.createDate),
          updatedDate: convertDateTimeFromServer(solicitacaoEntity.updatedDate),
          finishDate: convertDateTimeFromServer(solicitacaoEntity.finishDate),
          unidade: solicitacaoEntity?.unidade?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.solicitacao.home.createOrEditLabel" data-cy="SolicitacaoCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.solicitacao.home.createOrEditLabel">Create or edit a Solicitacao</Translate>
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
                  id="solicitacao-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.prazoDate')}
                id="solicitacao-prazoDate"
                name="prazoDate"
                data-cy="prazoDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.createDate')}
                id="solicitacao-createDate"
                name="createDate"
                data-cy="createDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.updatedDate')}
                id="solicitacao-updatedDate"
                name="updatedDate"
                data-cy="updatedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.finishDate')}
                id="solicitacao-finishDate"
                name="finishDate"
                data-cy="finishDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.aberta')}
                id="solicitacao-aberta"
                name="aberta"
                data-cy="aberta"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.descricao')}
                id="solicitacao-descricao"
                name="descricao"
                data-cy="descricao"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacao.observacao')}
                id="solicitacao-observacao"
                name="observacao"
                data-cy="observacao"
                type="text"
              />
              <ValidatedField
                id="solicitacao-unidade"
                name="unidade"
                data-cy="unidade"
                label={translate('ebisaOsApp.solicitacao.unidade')}
                type="select"
              >
                <option value="" key="0" />
                {unidades
                  ? unidades.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/solicitacao" replace color="info">
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

export default SolicitacaoUpdate;
