import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label, Input } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IItem } from 'app/shared/model/item.model';
import { getEntity, updateEntity, createEntity, reset } from './item.reducer';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const ItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const itemEntity = useAppSelector(state => state.item.entity);
  const loading = useAppSelector(state => state.item.loading);
  const updating = useAppSelector(state => state.item.updating);
  const updateSuccess = useAppSelector(state => state.item.updateSuccess);

  const [itemData, setItemData] = useState<IItem>({});

  const handleClose = () => {
    dispatch(reset());
    navigate('/item');
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

  useEffect(() => {
    if (itemEntity?.id !== undefined) {
      setItemData(itemEntity);
    }
  }, [itemEntity]);

  // eslint-disable-next-line complexity
  const saveEntity = () => {
    if (itemData.id !== undefined && typeof itemData.id !== 'number') {
      itemData.id = Number(itemData.id);
    }

    const entity = {
      ...itemData,
      createdDate: convertDateTimeToServer(itemData?.createdDate?.toString()),
      lastModifiedDate: convertDateTimeToServer(itemData?.lastModifiedDate?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  return (
    <div className="stock-update-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">
            {!isNew ? 'Editar Item' : 'Criar Item'}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Row>
                <Col>
                  <Label>Nome Item</Label>
                  <Input
                    placeholder="Nome Item"
                    value={itemData?.nomeItem}
                    onChange={e => setItemData({ ...itemData, nomeItem: e.target.value })}
                  />
                </Col>
              </Row>

              <Row className="buttons-container">
                <Col>
                  <Button onClick={() => handleClose()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span> Voltar </span>
                  </Button>
                </Col>

                <Col>
                  <Button onClick={() => saveEntity()} disabled={updating}>
                    <span> Salvar </span>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ItemUpdate;
