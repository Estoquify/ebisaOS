import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Input, Label } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMunicipio } from 'app/shared/model/municipio.model';
import { getEntities as getMunicipios } from 'app/entities/municipio/municipio.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntity, updateEntity, createEntity, reset } from './endereco.reducer';
import { cepMask, numberMask } from 'app/shared/util/Misc';
import { toNumber } from 'lodash';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const EnderecoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const municipios = useAppSelector(state => state.municipio.entities);
  const loading = useAppSelector(state => state.endereco.loading);
  const updating = useAppSelector(state => state.endereco.updating);
  const updateSuccess = useAppSelector(state => state.endereco.updateSuccess);

  const [enderecoData, setEnderecoData] = useState<IEndereco>({});

  const handleClose = () => {
    navigate('/endereco');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      axios
        .get(`/api/enderecos/${id}`)
        .then(res => {
          setEnderecoData(res?.data);
        })
        .catch(err => {});
    }

    dispatch(getMunicipios({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = () => {
    if (enderecoData.id !== undefined && typeof enderecoData.id !== 'number') {
      enderecoData.id = Number(enderecoData.id);
    }

    const entity = {
      ...enderecoData,
      municipio: municipios.find(it => it.id.toString() === enderecoData?.municipio?.id?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.endereco.home.createOrEditLabel" data-cy="EnderecoCreateUpdateHeading">
            {!isNew ? 'Editar Endereço' : 'Criar Endereço'}
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
                  <Label>Logradouro</Label>
                  <Input
                    label={translate('ebisaOsApp.endereco.logradouro')}
                    id="endereco-logradouro"
                    name="logradouro"
                    data-cy="logradouro"
                    placeholder="Logradouro"
                    type="text"
                    value={enderecoData?.logradouro}
                    onChange={e => setEnderecoData({ ...enderecoData, logradouro: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>CEP</Label>
                  <Input
                    label={translate('ebisaOsApp.endereco.cep')}
                    id="endereco-cep"
                    name="cep"
                    data-cy="cep"
                    placeholder="CEP"
                    type="text"
                    value={enderecoData?.cep}
                    onChange={e => setEnderecoData({ ...enderecoData, cep: cepMask(e.target.value) })}
                  />
                </Col>

                <Col>
                  <Label>Numero</Label>
                  <Input
                    label={translate('ebisaOsApp.endereco.numero')}
                    id="endereco-numero"
                    name="numero"
                    placeholder="Numero"
                    data-cy="numero"
                    type="text"
                    value={enderecoData?.numero}
                    onChange={e => setEnderecoData({ ...enderecoData, numero: numberMask(e.target.value) })}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Label>Bairro</Label>
                  <Input
                    label={translate('ebisaOsApp.endereco.bairro')}
                    id="endereco-bairro"
                    name="bairro"
                    data-cy="bairro"
                    placeholder="Bairro"
                    type="text"
                    value={enderecoData?.bairro}
                    onChange={e => setEnderecoData({ ...enderecoData, bairro: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>Municipio</Label>
                  <Input
                    id="endereco-municipio"
                    name="municipio"
                    data-cy="municipio"
                    label={translate('ebisaOsApp.endereco.municipio')}
                    type="select"
                    placeholder="Municipio"
                    value={enderecoData?.municipio?.id}
                    onChange={e =>
                      setEnderecoData({ ...enderecoData, municipio: { ...enderecoData?.municipio, id: toNumber(e.target.value) } })
                    }
                  >
                    <option value="" key="0" />
                    {municipios
                      ? municipios.map((otherEntity: IMunicipio) => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity?.nomeMunicipio}
                          </option>
                        ))
                      : null}
                  </Input>
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

export default EnderecoUpdate;
