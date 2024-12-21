import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Input, Label } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMunicipio } from 'app/shared/model/municipio.model';
import { getEntity, updateEntity, createEntity, reset } from './municipio.reducer';
import { faChevronLeft, faFloppyDisk, faPen } from '@fortawesome/free-solid-svg-icons';
import { numberMask } from 'app/shared/util/Misc';
import axios from 'axios';

export const MunicipioDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const loading = useAppSelector(state => state.municipio.loading);
  const updating = useAppSelector(state => state.municipio.updating);

  const [municipioData, setMunicipioData] = useState<IMunicipio>({});

  const handleClose = () => {
    navigate('/municipio');
  };

  const handleEditar = () => {
    navigate('./edit');
  };

  useEffect(() => {
    axios
      .get(`/api/municipios/${id}`)
      .then(suc => {
        setMunicipioData(suc?.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.municipio.home.createOrEditLabel" data-cy="MunicipioCreateUpdateHeading">
            Visualizar Municipio
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
                    disabled
                    readOnly
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
                    disabled
                    readOnly
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
                  <Button onClick={() => handleEditar()} disabled={updating}>
                    <span> Editar </span>
                    <FontAwesomeIcon icon={faPen} />
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

export default MunicipioDetail;
