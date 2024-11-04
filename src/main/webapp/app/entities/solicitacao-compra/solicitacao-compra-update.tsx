import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IStock } from 'app/shared/model/stock.model';
import { getEntities as getStocks } from 'app/entities/stock/stock.reducer';
import { ISolicitacaoCompra } from 'app/shared/model/solicitacao-compra.model';
import { getEntity, updateEntity, createEntity, reset } from './solicitacao-compra.reducer';

export const SolicitacaoCompraUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const stocks = useAppSelector(state => state.stock.entities);
  const solicitacaoCompraEntity = useAppSelector(state => state.solicitacaoCompra.entity);
  const loading = useAppSelector(state => state.solicitacaoCompra.loading);
  const updating = useAppSelector(state => state.solicitacaoCompra.updating);
  const updateSuccess = useAppSelector(state => state.solicitacaoCompra.updateSuccess);

  const handleClose = () => {
    navigate('/solicitacao-compra');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getStocks({}));
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
    values.createDate = convertDateTimeToServer(values.createDate);

    const entity = {
      ...solicitacaoCompraEntity,
      ...values,
      stock: stocks.find(it => it.id.toString() === values.stock?.toString()),
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
          createDate: displayDefaultDateTime(),
        }
      : {
          ...solicitacaoCompraEntity,
          createDate: convertDateTimeFromServer(solicitacaoCompraEntity.createDate),
          stock: solicitacaoCompraEntity?.stock?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.solicitacaoCompra.home.createOrEditLabel" data-cy="SolicitacaoCompraCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.solicitacaoCompra.home.createOrEditLabel">Create or edit a SolicitacaoCompra</Translate>
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
                  id="solicitacao-compra-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.solicitacaoCompra.descricao')}
                id="solicitacao-compra-descricao"
                name="descricao"
                data-cy="descricao"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacaoCompra.createDate')}
                id="solicitacao-compra-createDate"
                name="createDate"
                data-cy="createDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.solicitacaoCompra.aberta')}
                id="solicitacao-compra-aberta"
                name="aberta"
                data-cy="aberta"
                check
                type="checkbox"
              />
              <ValidatedField
                id="solicitacao-compra-stock"
                name="stock"
                data-cy="stock"
                label={translate('ebisaOsApp.solicitacaoCompra.stock')}
                type="select"
              >
                <option value="" key="0" />
                {stocks
                  ? stocks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/solicitacao-compra" replace color="info">
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

export default SolicitacaoCompraUpdate;
