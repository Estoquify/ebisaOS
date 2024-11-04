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
import { ILogStockItens } from 'app/shared/model/log-stock-itens.model';
import { getEntity, updateEntity, createEntity, reset } from './log-stock-itens.reducer';

export const LogStockItensUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const stocks = useAppSelector(state => state.stock.entities);
  const logStockItensEntity = useAppSelector(state => state.logStockItens.entity);
  const loading = useAppSelector(state => state.logStockItens.loading);
  const updating = useAppSelector(state => state.logStockItens.updating);
  const updateSuccess = useAppSelector(state => state.logStockItens.updateSuccess);

  const handleClose = () => {
    navigate('/log-stock-itens');
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
    values.createDade = convertDateTimeToServer(values.createDade);
    if (values.quantAtual !== undefined && typeof values.quantAtual !== 'number') {
      values.quantAtual = Number(values.quantAtual);
    }
    if (values.quantAnterior !== undefined && typeof values.quantAnterior !== 'number') {
      values.quantAnterior = Number(values.quantAnterior);
    }
    values.updateDate = convertDateTimeToServer(values.updateDate);

    const entity = {
      ...logStockItensEntity,
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
          createDade: displayDefaultDateTime(),
          updateDate: displayDefaultDateTime(),
        }
      : {
          ...logStockItensEntity,
          createDade: convertDateTimeFromServer(logStockItensEntity.createDade),
          updateDate: convertDateTimeFromServer(logStockItensEntity.updateDate),
          stock: logStockItensEntity?.stock?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.logStockItens.home.createOrEditLabel" data-cy="LogStockItensCreateUpdateHeading">
            <Translate contentKey="ebisaOsApp.logStockItens.home.createOrEditLabel">Create or edit a LogStockItens</Translate>
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
                  id="log-stock-itens-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('ebisaOsApp.logStockItens.createDade')}
                id="log-stock-itens-createDade"
                name="createDade"
                data-cy="createDade"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ebisaOsApp.logStockItens.quantAtual')}
                id="log-stock-itens-quantAtual"
                name="quantAtual"
                data-cy="quantAtual"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.logStockItens.quantAnterior')}
                id="log-stock-itens-quantAnterior"
                name="quantAnterior"
                data-cy="quantAnterior"
                type="text"
              />
              <ValidatedField
                label={translate('ebisaOsApp.logStockItens.updateDate')}
                id="log-stock-itens-updateDate"
                name="updateDate"
                data-cy="updateDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="log-stock-itens-stock"
                name="stock"
                data-cy="stock"
                label={translate('ebisaOsApp.logStockItens.stock')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/log-stock-itens" replace color="info">
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

export default LogStockItensUpdate;
