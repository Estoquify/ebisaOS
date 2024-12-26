import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppSelector } from 'app/config/store';

import { IOrgao } from 'app/shared/model/orgao.model';
import axios from 'axios';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';

export const OrgaoDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const loading = useAppSelector(state => state.orgao.loading);
  const updating = useAppSelector(state => state.orgao.updating);

  const [orgaoData, setOrgaoData] = useState<IOrgao>({});

  const handleClose = () => {
    navigate('/orgao');
  };

  const handleEditar = () => {
    navigate('./edit');
  };

  useEffect(() => {
    axios
      .get(`/api/orgaos/${id}`)
      .then(res => {
        setOrgaoData(res?.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.orgao.home.createOrEditLabel" data-cy="OrgaoCreateUpdateHeading">
            Visualizar Orgão
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
                    placeholder="Orgão Nome"
                    value={orgaoData?.nome}
                    disabled
                    readOnly
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

export default OrgaoDetail;
