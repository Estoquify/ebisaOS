import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMunicipio } from 'app/shared/model/municipio.model';
import { getEntity, updateEntity, createEntity, reset } from './municipio.reducer';

export const MunicipioUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const municipioEntity = useAppSelector(state => state.municipio.entity);
  const loading = useAppSelector(state => state.municipio.loading);
  const updating = useAppSelector(state => state.municipio.updating);
  const updateSuccess = useAppSelector(state => state.municipio.updateSuccess);

  const handleClose = () => {
    navigate('/municipio');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
    if (values.codigoIBGE !== undefined && typeof values.codigoIBGE !== 'number') {
      values.codigoIBGE = Number(values.codigoIBGE);
    }

    const entity = {
      ...municipioEntity,
      ...values,
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
          ...municipioEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.municipio.home.createOrEditLabel" data-cy="MunicipioCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.municipio.home.createOrEditLabel">Create or edit a Municipio</Translate>
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
                  id="municipio-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.municipio.codigoIBGE')}
                id="municipio-codigoIBGE"
                name="codigoIBGE"
                data-cy="codigoIBGE"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.municipio.nomeMunicipio')}
                id="municipio-nomeMunicipio"
                name="nomeMunicipio"
                data-cy="nomeMunicipio"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/municipio" replace color="info">
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

export default MunicipioUpdate;
