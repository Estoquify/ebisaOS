import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISetor } from 'app/shared/model/setor.model';
import { updateEntity, createEntity, reset } from './setor.reducer';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const SetorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const loading = useAppSelector(state => state.setor.loading);
  const updating = useAppSelector(state => state.setor.updating);
  const updateSuccess = useAppSelector(state => state.setor.updateSuccess);

  const [setorData, setSetorData] = useState<ISetor>({});

  const handleClose = () => {
    navigate('/setor');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      axios
        .get(`/api/setors/${id}`)
        .then(res => {
          setSetorData(res?.data);
        })
        .catch(err => {});
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = () => {
    if (setorData.id !== undefined && typeof setorData.id !== 'number') {
      setorData.id = Number(setorData.id);
    }

    if (isNew) {
      dispatch(createEntity(setorData));
    } else {
      dispatch(updateEntity(setorData));
    }
  };

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.setor.home.createOrEditLabel" data-cy="SetorCreateUpdateHeading">
            {isNew ? 'Criar Setor' : 'Editar Setor'}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div>
              <Row>
                <Col>
                  <Label>Nome setor</Label>
                  <Input
                    label={translate('ebisaOsApp.setor.nome')}
                    id="setor-nome"
                    name="nome"
                    data-cy="nome"
                    type="text"
                    placeholder='Nome Setor'
                    value={setorData?.nome}
                    onChange={e => setSetorData({ ...setorData, nome: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>Descrição</Label>
                  <Input
                    label={translate('ebisaOsApp.setor.descricao')}
                    id="setor-descricao"
                    name="descricao"
                    data-cy="descricao"
                    placeholder='Descrição'
                    type="text"
                    value={setorData?.descricao}
                    onChange={e => setSetorData({ ...setorData, descricao: e.target.value })}
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
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SetorUpdate;
