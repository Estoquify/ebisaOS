import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label, Input } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { getEntities as getColaboradors } from 'app/entities/colaborador/colaborador.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';
import { getEntity, updateEntity, createEntity, reset } from './equipe.reducer';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

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

  const [equipeData, setEquipeData] = useState<IEquipe>({});

  const handleClose = () => {
    dispatch(reset());
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

  useEffect(() => {
    if (equipeEntity?.id !== undefined) {
      setEquipeData(equipeEntity);
    }
  }, [equipeEntity]);

  // eslint-disable-next-line complexity
  const saveEntity = () => {
    if (equipeData.id !== undefined && typeof equipeData.id !== 'number') {
      equipeData.id = Number(equipeData.id);
    }

    const entity = {
      ...equipeData,
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
            {!isNew ? 'Editar Equipe' : 'Criar Equipe'}
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
                  <Label>Equipe Apelido</Label>
                  <Input
                    placeholder="Apelido Equipe"
                    value={equipeData?.apelido}
                    onChange={e => setEquipeData({ ...equipeData, apelido: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>Equipe Descrição</Label>
                  <Input
                    placeholder="Descrição Equipe"
                    value={equipeData?.descricao}
                    type='textarea'
                    onChange={e => setEquipeData({ ...equipeData, descricao: e.target.value })}
                    style={{maxHeight: '150px'}}
                  />
                </Col>

                <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Label>Equipe Ativa</Label>
                  <Input
                    checked={equipeData?.ativa}
                    type='checkbox'
                    style={{padding: '1em', boxShadow: '0px 0px 10px 1px #ccc', border: '1px solid #ccc'}}
                    onChange={e => setEquipeData({ ...equipeData, ativa: !equipeData?.ativa })}
                  />
                </Col>

                <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Label>Equipe Ocupada</Label>
                  <Input
                    type='checkbox'
                    checked={equipeData?.ocupada}
                    style={{padding: '1em', boxShadow: '0px 0px 10px 1px #ccc', border: '1px solid #ccc'}}
                    onChange={e => setEquipeData({ ...equipeData, ocupada: !equipeData?.ocupada })}
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

export default EquipeUpdate;
