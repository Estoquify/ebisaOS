import { faChevronLeft, faChevronRight, faFloppyDisk, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getItens } from 'app/entities/item/item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import tipoSolicitacao from 'app/shared/enum/TipoSolicitacao';
import dayjs from 'dayjs';
import { createEntity } from '../solicitacao.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { toast } from 'react-toastify';

import './solicitacao-create.scss';
import { IItemSelecionados } from 'app/shared/model/itemSelecionados.models';
import axios from 'axios';
import { ISolicitacaoDTO } from 'app/shared/model/SolicitacaoDTO.model';
import { toNumber } from 'lodash';
import { getEntitiesByUnidadeId as getSetorUnidade } from 'app/entities/setor-unidade/setor-unidade.reducer';
import { ISetorUnidade } from 'app/shared/model/setor-unidade.model';

const SolicitacaoCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itens: IItem[] = useAppSelector(state => state?.item?.entities);
  const setorUnidadeId = useAppSelector(state => state?.authentication?.account?.setorUnidade?.id);

  const [setorUnidadeList, setSetorUnidadeList] = useState<ISetorUnidade[]>([]);
  const [solicitacao, setSolicitacao] = useState<ISolicitacao>({ titulo: '', descricao: '' });
  const [itensSelecionados, setItensSelecionados] = useState<IItemSelecionados[]>([]);

  useEffect(() => {
    dispatch(getItens({}));
  }, []);

  useEffect(() => {
    if (setorUnidadeId !== undefined) {
      axios
        .get(`/api/setorUnidades/unidade/${setorUnidadeId}`)
        .then(res => {
          setSetorUnidadeList(res?.data);
        })
        .catch(err => {
          toast.error('Não foi possivel identificar sua unidade tente novamente mais tarde');
        });
    }
  }, [setorUnidadeId]);

  const handleCreateSolicitacao = () => {
    const solicitacaoFixed: ISolicitacao = {
      ...solicitacao,
      setorUnidade: setorUnidadeList?.find(data => solicitacao?.setorUnidade?.id === data?.id),
    };

    const entityFixed: ISolicitacaoDTO = {
      itensSelecionados,
      solicitacao: solicitacaoFixed,
    };

    axios.post(`/api/solicitacaos`, entityFixed).then(res => {
      toast.success('Solicitação criada com sucesso!');
      navigate(-1);
    });
  };

  const handleAddItem = (item: IItem) => {
    setItensSelecionados(prevItensSelecionados => {
      const itemExistente = prevItensSelecionados.find(data => data.item === item);

      if (itemExistente) {
        return prevItensSelecionados.map(data => (data.item === item ? { ...data, quantidade: (data.quantidade || 0) + 1 } : data));
      } else {
        return [...prevItensSelecionados, { item, quantidade: 1 }];
      }
    });
  };

  const handleRemoveItem = (item: IItem) => {
    setItensSelecionados(prevItensSelecionados => {
      const itemExistente = prevItensSelecionados.find(data => data.item === item);

      if (itemExistente) {
        return prevItensSelecionados.filter(data => data.item !== item);
      }

      return prevItensSelecionados;
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

    if (!solicitacaoData.descricao || solicitacaoData.descricao.trim() === '') {
      errors.push('A descrição não pode estar vazia.');
    }

    if (solicitacaoData.prazoDate && !dayjs(solicitacaoData.prazoDate).isAfter(dayjs())) {
      errors.push('A data do prazo deve estar no futuro.');
    }

    return errors.length > 0 ? { isValid: false, errors } : { isValid: true, errors: [] };
  };

  const handleValidateSolicitacaoCreate = () => {
    const result = validateCreateSolicitacao(solicitacao);
    if (!result.isValid) {
      result?.errors?.map(data => {
        toast.error(`Erro de validação: ${data}`);
      });
    } else {
      handleCreateSolicitacao();
    }
  };

  const handleUpdateQuantidade = (item: IItem, quantidade: number) => {
    setItensSelecionados(prevItensSelecionados =>
      prevItensSelecionados.map(data =>
        data.item === item ? { ...data, quantidade: quantidade > 0 ? quantidade : 1 } : data,
      ),
    );
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, item: IItem) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      handleUpdateQuantidade(item, value > 0 ? value : 1);
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
          <Col>
            <Label>Setor</Label>
            <Input
              type="select"
              onChange={e => setSolicitacao({ ...solicitacao, setorUnidade: { id: toNumber(e.target.value) } })}
              value={solicitacao?.setorUnidade?.id}
            >
              <option value={0}>Escolha um Setor</option>
              {setorUnidadeList &&
                setorUnidadeList?.map((data, key) => (
                  <>
                    <option key={key} value={data?.id}>
                      {data?.nome}
                    </option>
                  </>
                ))}
            </Input>
          </Col>

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
                  {itensSelecionados &&
                    itensSelecionados?.length > 0 &&
                    itensSelecionados?.map((data, key) => (
                      <React.Fragment key={key}>
                        <div className="itens-container">
                          <div className="itens-container-text">
                            <span>{data?.item?.nomeItem}</span>
                          </div>

                          <div className="itens-container-icon">
                            <Button className="itens-container-icon-minus" onClick={() => handleRemoveItem(data?.item)}>
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <Input
                              type="text"
                              value={data?.quantidade}
                              onChange={e => handleInputChange(e, data?.item)}
                              alt='Quantidade Item'
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ))}

                  {itensSelecionados && itensSelecionados?.length === 0 && <span>Nenhum item selecionado</span>}
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
