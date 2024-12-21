import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Label } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IOrgao } from 'app/shared/model/orgao.model';
import { getEntities as getOrgaos } from 'app/entities/orgao/orgao.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { updateEntity, createEntity, reset } from './unidade.reducer';
import { faChevronLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { toNumber } from 'lodash';
import axios from 'axios';

export const UnidadeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const enderecos = useAppSelector(state => state.endereco.entities);
  const orgaos = useAppSelector(state => state.orgao.entities);
  const loading = useAppSelector(state => state.unidade.loading);
  const updating = useAppSelector(state => state.unidade.updating);
  const updateSuccess = useAppSelector(state => state.unidade.updateSuccess);

  const [unidadeData, setUnidadeData] = useState<IUnidade>({});

  const handleClose = () => {
    navigate('/unidade');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      axios
        .get(`/api/unidades/${id}`)
        .then(res => {
          setUnidadeData(res?.data);
        })
        .catch(err => {});
    }

    dispatch(getEnderecos({}));
    dispatch(getOrgaos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = () => {
    if (unidadeData.id !== undefined && typeof unidadeData.id !== 'number') {
      unidadeData.id = Number(unidadeData.id);
    }

    const entity = {
      ...unidadeData,
      endereco: enderecos.find(it => it.id.toString() === unidadeData?.endereco?.id?.toString()),
      orgao: orgaos.find(it => it.id.toString() === unidadeData?.orgao?.id?.toString()),
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
          <h2 id="ebisaOsApp.unidade.home.createOrEditLabel" data-cy="UnidadeCreateUpdateHeading">
            {isNew ? "Criar Unidade" : "Editar Unidade"}
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
                  <Label>Nome</Label>
                  <Input
                    label={translate('ebisaOsApp.unidade.nome')}
                    id="unidade-nome"
                    name="nome"
                    data-cy="nome"
                    type="text"
                    placeholder="Nome"
                    value={unidadeData?.nome}
                    onChange={e => setUnidadeData({ ...unidadeData, nome: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>CNPJ</Label>
                  <Input
                    label={translate('ebisaOsApp.unidade.cnpj')}
                    id="unidade-cnpj"
                    name="cnpj"
                    data-cy="cnpj"
                    type="text"
                    placeholder="CNPJ"
                    value={unidadeData?.cnpj}
                    onChange={e => setUnidadeData({ ...unidadeData, cnpj: e.target.value })}
                  />
                </Col>

                <Col>
                  <Label>Endereço</Label>
                  <Input
                    id="unidade-endereco"
                    name="endereco"
                    data-cy="endereco"
                    label={translate('ebisaOsApp.unidade.endereco')}
                    type="select"
                    placeholder="Endereço"
                    value={unidadeData?.endereco?.id}
                    onChange={e => setUnidadeData({ ...unidadeData, endereco: { ...unidadeData?.endereco, id: toNumber(e.target.value) } })}
                  >
                    <option value="" key="0" />
                    {enderecos
                      ? enderecos.map((otherEntity: IEndereco) => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity?.logradouro}
                          </option>
                        ))
                      : null}
                  </Input>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Label>Orgão</Label>
                  <Input
                    id="unidade-orgao"
                    name="orgao"
                    data-cy="orgao"
                    label={translate('ebisaOsApp.unidade.orgao')}
                    type="select"
                    value={unidadeData?.orgao?.id}
                    onChange={e => setUnidadeData({ ...unidadeData, orgao: { ...unidadeData?.orgao, id: toNumber(e.target.value) } })}
                  >
                    <option value="" key="0" />
                    {orgaos
                      ? orgaos.map((otherEntity: IOrgao) => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity?.nome}
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

export default UnidadeUpdate;
