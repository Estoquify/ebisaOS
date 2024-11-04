import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IOrgao } from 'app/shared/model/orgao.model';
import { getEntities as getOrgaos } from 'app/entities/orgao/orgao.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { getEntity, updateEntity, createEntity, reset } from './unidade.reducer';

export const UnidadeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const enderecos = useAppSelector(state => state.endereco.entities);
  const orgaos = useAppSelector(state => state.orgao.entities);
  const unidadeEntity = useAppSelector(state => state.unidade.entity);
  const loading = useAppSelector(state => state.unidade.loading);
  const updating = useAppSelector(state => state.unidade.updating);
  const updateSuccess = useAppSelector(state => state.unidade.updateSuccess);

  const handleClose = () => {
    navigate('/unidade');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEnderecos({}));
    dispatch(getOrgaos({}));
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
      ...unidadeEntity,
      ...values,
      endereco: enderecos.find(it => it.id.toString() === values.endereco?.toString()),
      orgao: orgaos.find(it => it.id.toString() === values.orgao?.toString()),
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
          ...unidadeEntity,
          endereco: unidadeEntity?.endereco?.id,
          orgao: unidadeEntity?.orgao?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.unidade.home.createOrEditLabel" data-cy="UnidadeCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.unidade.home.createOrEditLabel">Create or edit a Unidade</Translate>
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
                  id="unidade-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('ebisaOsApp.unidade.nome')} id="unidade-nome" name="nome" data-cy="nome" type="text" />
              <ValidatedField label={translate('ebisaOsApp.unidade.cnpj')} id="unidade-cnpj" name="cnpj" data-cy="cnpj" type="text" />
              <ValidatedField
                id="unidade-endereco"
                name="endereco"
                data-cy="endereco"
                label={translate('ebisaOsApp.unidade.endereco')}
                type="select"
              >
                <option value="" key="0" />
                {enderecos
                  ? enderecos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="unidade-orgao" name="orgao" data-cy="orgao" label={translate('ebisaOsApp.unidade.orgao')} type="select">
                <option value="" key="0" />
                {orgaos
                  ? orgaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/unidade" replace color="info">
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

export default UnidadeUpdate;
