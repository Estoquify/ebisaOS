import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Label } from 'reactstrap';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IOrgao } from 'app/shared/model/orgao.model';
import { getEntities as getOrgaos } from 'app/entities/orgao/orgao.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { toNumber } from 'lodash';
import axios from 'axios';
import { cepMask, numberMask } from 'app/shared/util/Misc';
import { IMunicipio } from 'app/shared/model/municipio.model';
import { getEntities as getMunicipios } from 'app/entities/municipio/municipio.reducer';

export const UnidadeDetail = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const municipios = useAppSelector(state => state.municipio.entities);
  const orgaos = useAppSelector(state => state.orgao.entities);
  const loading = useAppSelector(state => state.unidade.loading);
  const updating = useAppSelector(state => state.unidade.updating);

  const [unidadeData, setUnidadeData] = useState<IUnidade>({});

  const handleClose = () => {
    navigate('/unidade');
  };

  const handleEditar = () => {
    navigate('./edit');
  };

  useEffect(() => {
    axios
      .get(`/api/unidades/${id}`)
      .then(res => {
        setUnidadeData(res?.data);
      })
      .catch(err => {});

    dispatch(getMunicipios({}));
    dispatch(getOrgaos({}));
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.unidade.home.createOrEditLabel" data-cy="UnidadeCreateUpdateHeading">
            Visualizar Unidade
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div>
                <Row>
                  <Col>
                    <Label>Nome Unidade</Label>
                    <Input
                      label={translate('ebisaOsApp.unidade.nome')}
                      id="unidade-nome"
                      name="nome"
                      data-cy="nome"
                      type="text"
                      placeholder="Nome"
                      value={unidadeData?.nome}
                      onChange={e => setUnidadeData({ ...unidadeData, nome: e.target.value })}
                      disabled
                      readOnly
                    />
                  </Col>

                  <Col>
                    <Label>CNPJ Unidade</Label>
                    <Input
                      label={translate('ebisaOsApp.unidade.cnpj')}
                      id="unidade-cnpj"
                      name="cnpj"
                      data-cy="cnpj"
                      type="text"
                      placeholder="CNPJ"
                      value={unidadeData?.cnpj}
                      onChange={e => setUnidadeData({ ...unidadeData, cnpj: e.target.value })}
                      disabled
                      readOnly
                    />
                  </Col>

                  <Col>
                    <Label>Orgão Unidade</Label>
                    <Input
                      id="unidade-orgao"
                      name="orgao"
                      data-cy="orgao"
                      label={translate('ebisaOsApp.unidade.orgao')}
                      type="select"
                      value={unidadeData?.orgao?.id}
                      onChange={e => setUnidadeData({ ...unidadeData, orgao: { ...unidadeData?.orgao, id: toNumber(e.target.value) } })}
                      disabled
                      readOnly
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
              </div>

              <div>
                <Row>
                  <h4> Endereço: </h4>
                </Row>

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
                      value={unidadeData?.endereco?.logradouro}
                      onChange={e => setUnidadeData({ ...unidadeData, endereco: { ...unidadeData?.endereco, logradouro: e.target.value } })}
                      disabled
                      readOnly
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
                      value={unidadeData?.endereco?.cep}
                      onChange={e =>
                        setUnidadeData({ ...unidadeData, endereco: { ...unidadeData?.endereco, cep: cepMask(e.target.value) } })
                      }
                      disabled
                      readOnly
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
                      value={unidadeData?.endereco?.numero}
                      onChange={e =>
                        setUnidadeData({ ...unidadeData, endereco: { ...unidadeData?.endereco, numero: numberMask(e.target.value) } })
                      }
                      disabled
                      readOnly
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
                      value={unidadeData?.endereco?.bairro}
                      onChange={e => setUnidadeData({ ...unidadeData, endereco: { ...unidadeData?.endereco, bairro: e.target.value } })}
                      disabled
                      readOnly
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
                      value={unidadeData?.endereco?.municipio?.id}
                      onChange={e =>
                        setUnidadeData({
                          ...unidadeData,
                          endereco: { ...unidadeData?.endereco, municipio: { id: toNumber(e.target.value) } },
                        })
                      }
                      disabled
                      readOnly
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
              </div>

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

export default UnidadeDetail;
