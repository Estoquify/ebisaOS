import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Label } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMunicipio } from 'app/shared/model/municipio.model';
import { updateEntity, createEntity, reset } from './municipio.reducer';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { numberMask } from 'app/shared/util/Misc';
import axios from 'axios';

export const MunicipioUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const loading = useAppSelector(state => state.municipio.loading);
  const updating = useAppSelector(state => state.municipio.updating);
  const updateSuccess = useAppSelector(state => state.municipio.updateSuccess);

  const [municipioData, setMunicipioData] = useState<IMunicipio>({});

  const handleClose = () => {
    navigate('/municipio');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      axios
        .get(`/api/municipios/${id}`)
        .then(suc => {
          setMunicipioData(suc?.data);
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
    if (municipioData.id !== undefined && typeof municipioData.id !== 'number') {
      municipioData.id = Number(municipioData.id);
    }
    if (municipioData.codigoIBGE !== undefined && typeof municipioData.codigoIBGE !== 'number') {
      municipioData.codigoIBGE = Number(municipioData.codigoIBGE);
    }

    if (isNew) {
      dispatch(createEntity(municipioData));
    } else {
      dispatch(updateEntity(municipioData));
    }
  };

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.municipio.home.createOrEditLabel" data-cy="MunicipioCreateUpdateHeading">
            {isNew ? 'Criar Municipio' : 'Editar Municipio'}
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
                  <Label>Codigo IBGE</Label>
                  <Input
                    label={translate('ebisaOsApp.municipio.codigoIBGE')}
                    id="municipio-codigoIBGE"
                    name="codigoIBGE"
                    data-cy="codigoIBGE"
                    type="text"
                    placeholder='Codigo IBGE'
                    value={municipioData?.codigoIBGE}
                    onChange={e => setMunicipioData({ ...municipioData, codigoIBGE: numberMask(e.target.value) })}
                  />
                </Col>

                <Col>
                  <Label>Nome Municipio</Label>
                  <Input
                    label={translate('ebisaOsApp.municipio.nomeMunicipio')}
                    id="municipio-nomeMunicipio"
                    name="nomeMunicipio"
                    data-cy="nomeMunicipio"
                    type="text"
                    placeholder='Nome Municipio'
                    value={municipioData?.nomeMunicipio}
                    onChange={e => setMunicipioData({ ...municipioData, nomeMunicipio: e.target.value })}
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

export default MunicipioUpdate;
