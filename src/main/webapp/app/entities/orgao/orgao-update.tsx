import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import {  translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrgao } from 'app/shared/model/orgao.model';
import {  updateEntity, createEntity, reset } from './orgao.reducer';
import axios from 'axios';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const OrgaoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const loading = useAppSelector(state => state.orgao.loading);
  const updating = useAppSelector(state => state.orgao.updating);
  const updateSuccess = useAppSelector(state => state.orgao.updateSuccess);

  const [orgaoData, setOrgaoData] = useState<IOrgao>({});

  const handleClose = () => {
    navigate('/orgao');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      axios
        .get(`/api/orgaos/${id}`)
        .then(res => {
          setOrgaoData(res?.data);
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
    if (orgaoData.id !== undefined && typeof orgaoData.id !== 'number') {
      orgaoData.id = Number(orgaoData.id);
    }

    if (isNew) {
      dispatch(createEntity(orgaoData));
    } else {
      dispatch(updateEntity(orgaoData));
    }
  };

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.orgao.home.createOrEditLabel" data-cy="OrgaoCreateUpdateHeading">
            {isNew ? 'Criar Orgão' : 'Editar Orgão'}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Row>
                <Col>
                  <Label>Orgão Nome</Label>
                  <Input
                    label={translate('ebisaOsApp.orgao.nome')}
                    id="orgao-nome"
                    name="nome"
                    data-cy="nome"
                    type="text"
                    placeholder='Orgão Nome'
                    value={orgaoData?.nome}
                    onChange={e => setOrgaoData({ ...orgaoData, nome: e.target.value })}
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

export default OrgaoUpdate;
