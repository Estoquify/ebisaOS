import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISetor } from 'app/shared/model/setor.model';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const SetorDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const loading = useAppSelector(state => state.setor.loading);
  const updating = useAppSelector(state => state.setor.updating);

  const [setorData, setSetorData] = useState<ISetor>({});

  const handleClose = () => {
    navigate('/setor');
  };

  const handleEditar = () => {
    navigate('./edit');
  };

  useEffect(() => {
    axios
      .get(`/api/setors/${id}`)
      .then(res => {
        setSetorData(res?.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.setor.home.createOrEditLabel" data-cy="SetorCreateUpdateHeading">
            Visualizar Setor
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
                  <Label>Nome setor</Label>
                  <Input
                    label={translate('ebisaOsApp.setor.nome')}
                    id="setor-nome"
                    name="nome"
                    data-cy="nome"
                    type="text"
                    placeholder='Nome Setor'
                    disabled
                    readOnly
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
                    type="text"
                    placeholder='Descrição'
                    disabled
                    readOnly
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

export default SetorDetail;
