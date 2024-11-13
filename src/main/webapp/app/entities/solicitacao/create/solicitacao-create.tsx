import { faChevronLeft, faChevronRight, faFloppyDisk, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

import './solicitacao-create.scss';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getItens } from 'app/entities/item/item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { IItemSelecionados } from 'app/shared/model/itemSelecionados.models';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import tipoSolicitacao from 'app/shared/enum/TipoSolicitacao';
import dayjs from 'dayjs';
import { createEntity } from '../solicitacao.reducer';
import { getEntities as getUnidades } from 'app/entities/unidade/unidade.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { toNumber } from 'lodash';
import { toast } from 'react-toastify';
import axios from 'axios';

const SolicitacaoCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itens: IItem[] = useAppSelector(state => state?.item?.entities);
  const unidades: IUnidade[] = useAppSelector(state => state?.unidade?.entities);

  const [solicitacao, setSolicitacao] = useState<ISolicitacao>({ itensSelecionados: [], titulo: '', descricao: '' });

  useEffect(() => {
    dispatch(getItens({}));
    dispatch(getUnidades({}));
  }, []);

  const handleCreateSolicitacao = () => {
    const solicitacaoFixed = { ...solicitacao, unidade: unidades?.find(data => solicitacao?.unidade?.id === data?.id) };
    dispatch(createEntity(solicitacaoFixed));
  };

  const handleAddItem = (item: IItem) => {
    setSolicitacao(prevSolicitacao => {
      const itensSelecionados = prevSolicitacao.itensSelecionados || [];

      const itemExistente = itensSelecionados.find(data => data.item === item);

      if (itemExistente) {
        return {
          ...prevSolicitacao,
          itensSelecionados: itensSelecionados.map(data =>
            data.item === item ? { ...data, quantidade: (data.quantidade || 0) + 1 } : data,
          ),
        };
      } else {
        return {
          ...prevSolicitacao,
          itensSelecionados: [...itensSelecionados, { item, quantidade: 1 }],
        };
      }
    });
  };

  const handleRemoveItem = (item: IItem) => {
    setSolicitacao(prevSolicitacao => {
      const itensSelecionados = prevSolicitacao.itensSelecionados || [];

      const itemExistente = itensSelecionados.find(data => data.item === item);

      if (itemExistente) {
        if ((itemExistente.quantidade || 0) > 1) {
          return {
            ...prevSolicitacao,
            itensSelecionados: itensSelecionados.map(data =>
              data.item === item ? { ...data, quantidade: (data.quantidade || 0) - 1 } : data,
            ),
          };
        } else {
          return {
            ...prevSolicitacao,
            itensSelecionados: itensSelecionados.filter(data => data.item !== item),
          };
        }
      }

      return prevSolicitacao;
    });
  };

  const validateCreateSolicitacao = (solicitacaoData: ISolicitacao) => {
    const errors: string[] = [];

    if (!solicitacaoData.titulo || solicitacaoData.titulo.length < 4) {
      errors.push('O título deve conter pelo menos 4 caracteres.');
    }

    if (!solicitacaoData.descricao || solicitacaoData.descricao.trim() === '') {
      errors.push('A descrição não pode estar vazia.');
    }

    if (solicitacaoData.tipoSolicitacao === null || solicitacaoData.tipoSolicitacao === undefined) {
      errors.push('O tipo de solicitação é obrigatório.');
    }

    if (solicitacaoData.prazoDate && !dayjs(solicitacaoData.prazoDate).isAfter(dayjs())) {
      errors.push('A data do prazo deve estar no futuro.');
    }

    return errors.length > 0 ? { isValid: false, errors } : { isValid: true, errors: [] };
  };

  const handleValidateSolicitacaoCreate = () => {
    console.log(solicitacao);
    const result = validateCreateSolicitacao(solicitacao);
    if (!result.isValid) {
      result?.errors?.map(data => {
        toast.error(`Erro de validação: ${data}`);
      });
    } else {
      handleCreateSolicitacao();
    }
  };

  const handleSelectTipoSolicitacao = (dadoTipoSolicitacao: string) => {
    const valorEnum = tipoSolicitacao[dadoTipoSolicitacao as keyof typeof tipoSolicitacao];

    setSolicitacao({
      ...solicitacao,
      tipoSolicitacao: valorEnum ?? null,
    });
  };

  return (
    <div className="solicitacao-create-container">
      <h2>Criar Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Titulo</Label>
            <Input
              placeholder="Titulo"
              value={solicitacao?.titulo}
              onChange={e => setSolicitacao({ ...solicitacao, titulo: e.target.value })}
            />
          </Col>
          {/* Input para escolher a unidade usado apenas para teste */}
          {/* <Col>
            <Input
              type="select"
              onChange={e => setSolicitacao({ ...solicitacao, unidade: { id: toNumber(e.target.value) } })}
              value={solicitacao?.unidade?.id}
            >
              {unidades &&
                unidades?.map((data, key) => (
                  <>
                    <option key={key} value={data?.id}>
                      {data?.nome}
                    </option>
                  </>
                ))}
            </Input>
          </Col> */}

          <Col>
            <Label>Classificação</Label>
            <Input
              type="select"
              onChange={e => handleSelectTipoSolicitacao(e.target.value)}
              value={solicitacao?.tipoSolicitacao !== null ? tipoSolicitacao[solicitacao.tipoSolicitacao] : ''}
            >
              <option value="">Tipo Solicitação</option>
              <option value="Servico">Serviço</option>
              <option value="Material">Material</option>
            </Input>
          </Col>

          <Col>
            <Label>Prazo</Label>
            <Input
              type="datetime-local"
              onChange={e => setSolicitacao({ ...solicitacao, prazoDate: dayjs(e.target.value?.toString()) })}
              value={solicitacao?.prazoDate ? solicitacao.prazoDate.format('YYYY-MM-DDTHH:mm') : ''}
            />
          </Col>
        </Row>

        <Row>
          <Col className="descricao-container">
            <Label>Descrição</Label>
            <Input type="textarea" placeholder="Descrição" onChange={e => setSolicitacao({ ...solicitacao, descricao: e.target.value })} />
          </Col>

          <Col>
            <div className="inventario-container">
              <span>Inventario</span>

              <div className="inventario-container-data">
                <div className="inventario-container_search-box">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Input type="text" placeholder="Pesquisa" />
                </div>

                <div className="itens-list">
                  {itens &&
                    itens?.length > 0 &&
                    itens?.map((data, key) => (
                      <React.Fragment key={key}>
                        <div className="itens-container">
                          <div className="itens-container-text">
                            <span>{data?.nomeItem}</span>
                          </div>

                          <Button className="itens-container-icon-plus" onClick={() => handleAddItem(data)}>
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </div>
                      </React.Fragment>
                    ))}

                  {itens && itens?.length === 0 && <span> Nenhum item cadastrado</span>}
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className="inventario-container">
              <span>Itens Selecionados</span>

              <div className="inventario-container-data">
                <div className="inventario-container_search-box">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Input type="text" placeholder="Pesquisa" />
                </div>

                <div className="itens-list">
                  {solicitacao?.itensSelecionados &&
                    solicitacao?.itensSelecionados?.length > 0 &&
                    solicitacao?.itensSelecionados?.map((data, key) => (
                      <React.Fragment key={key}>
                        <div className="itens-container">
                          <div className="itens-container-text">
                            <span>{data?.item?.nomeItem}</span>
                          </div>

                          <div className="itens-container-icon">
                            <Button className="itens-container-icon-minus" onClick={() => handleRemoveItem(data?.item)}>
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <span>{data?.quantidade}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}

                  {solicitacao?.itensSelecionados && solicitacao?.itensSelecionados?.length === 0 && <span>Nenhum item selecionado</span>}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="buttons-container">
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span> Voltar </span>
        </Button>

        <Button onClick={() => handleValidateSolicitacaoCreate()}>
          <span> Salvar </span>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </Button>
      </div>
    </div>
  );
};

export default SolicitacaoCreate;
