import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Label } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getItems } from 'app/entities/item/item.reducer';
import { getEntities as getSetors } from 'app/entities/setor/setor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './stock.reducer';
import { IStock } from 'app/shared/model/stock.model';
import { IItem } from 'app/shared/model/item.model';
import { ISetor } from 'app/shared/model/setor.model';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { toNumber } from 'lodash';
import { numberMask } from 'app/shared/util/Misc';
import { toast } from 'react-toastify';

export const StockUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const items: IItem[] = useAppSelector(state => state.item.entities);
  const setors: ISetor[] = useAppSelector(state => state.setor.entities);
  const stockEntity = useAppSelector(state => state.stock.entity);
  const loading = useAppSelector(state => state.stock.loading);
  const updating = useAppSelector(state => state.stock.updating);
  const updateSuccess = useAppSelector(state => state.stock.updateSuccess);

  const [stockData, setStockData] = useState<IStock>({ quantItem: 0 });

  const handleClose = () => {
    dispatch(reset());
    navigate('/stock');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getItems({}));
    dispatch(getSetors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (stockEntity?.id !== undefined) {
      setStockData(stockEntity);
    }
  }, [stockEntity]);

  const saveEntity = () => {
    if (stockData.id !== undefined && typeof stockData.id !== 'number') {
      stockData.id = Number(stockData.id);
    }
    if (stockData.quantItem !== undefined && typeof stockData.quantItem !== 'number') {
      stockData.quantItem = Number(stockData.quantItem);
    }

    if (!validateData()) {
      return;
    }

    const entity = {
      ...stockData,
      item: items.find(it => it.id.toString() === stockData?.item?.id?.toString()),
      setor: setors.find(it => it.id.toString() === stockData?.setor?.id?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const validateData = () => {
    if (stockData?.quantItem === 0) {
      toast.info('A quantidade maxima do item não pode ser 0');
      return false;
    } else if (stockData?.quantItem > stockData?.quantMax) {
      toast.info('A quantidade de itens não poder ser maior do que a quantidade maxima');
      return false;
    } else if (stockData?.item?.id === undefined || stockData?.item?.id === null) {
      toast.info('Escolha o Item para criar o Stock');
      return false;
    } else if (stockData?.setor?.id === undefined || stockData?.setor?.id === null) {
      toast.info('Escolha o Item para criar o Setor');
      return false;
    }

    return true;
  };

  return (
    <div className='stock-update-container'>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">
            {!isNew ? 'Editar Stock' : 'Criar Stock'}
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
                  <Label>Quantidade Item</Label>
                  <Input
                    placeholder="Quantidade Item"
                    value={stockData?.quantItem}
                    onChange={e => setStockData({ ...stockData, quantItem: toNumber(numberMask(e.target.value)) })}
                  />
                </Col>

                <Col>
                  <Label>Quantidade Item Maxima</Label>
                  <Input
                    placeholder="Quantidade Item"
                    value={stockData?.quantMax}
                    onChange={e => setStockData({ ...stockData, quantMax: toNumber(numberMask(e.target.value)) })}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Label>Stock Item</Label>
                  <Input placeholder="Item" type="select" value={stockData?.item?.id}>
                    <option>escolha um Item</option>
                    {items?.map((data, key) => (
                      <option value={data?.id} key={key}>
                        {data?.nomeItem}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label>Stock Setor</Label>
                  <Input placeholder="Item" type="select" value={stockData?.setor?.id}>
                    <option>escolha um Setor</option>
                    {setors?.map((data, key) => (
                      <option value={data?.id} key={key}>
                        {data?.nome}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>

              <Row className='buttons-container'>
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

export default StockUpdate;
