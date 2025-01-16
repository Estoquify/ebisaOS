import { faCheck, faChevronLeft, faFloppyDisk, faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import axios from 'axios';
import { toNumber } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntitiesAvailable } from 'app/entities/equipe/equipe.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';

import tipoSolicitacao from 'app/shared/enum/TipoSolicitacao';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import DragAndDrop from 'app/shared/layout/Dropzone/DropzoneComponent';
import { IArquivoModal } from 'app/shared/model/arquivo-modals.model';

import './Solicitacao-Ebisa-avaliar.scss';

// Esse precisa enviar a equipe diferente dos demais
const SolicitacaoEbisaAvaliacao = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const equipeEntities: IEquipe[] = useAppSelector(state => state?.equipe?.entities);

  const [solicitacaoData, setSolicitacaoData] = useState<ISolicitacaoViewServicoDto>();
  const [arquivosList, setArquivosList] = useState<IArquivoModal>({ arquivos: [], idSolicitacao: solicitacaoData?.solicitacao?.id });

  const [dataAvaliacao, setDataAvalicao] = useState<IAvaliacaoModals>({
    aprovacao: true,
    prioridade: 0,
    resposta: '',
    equipes: [],
  });

  useEffect(() => {
    axios
      .get(`/api/solicitacaos/solicitacaoViewServico/${id}`)
      .then(res => {
        setSolicitacaoData(res?.data);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    dispatch(getEntitiesAvailable());
  }, []);

  const handleSaveAvaliacaoSolicitacao = () => {
    // Caso a solicitação tenha sido aceita
    if (!arquivosList?.arquivos?.length) {
      toast.info('Por favor, adicione o orçamento.');
      return;
    }

    if (!dataAvaliacao?.equipes?.length && solicitacaoData?.solicitacao?.tipoSolicitacao === tipoSolicitacao.Servico) {
      toast.info('Escolha pelo menos uma equipe.');
      return;
    }

    const dataFormated: IAvaliacaoModals = {
      ...dataAvaliacao,
      idSolicitacao: toNumber(id),
      arquivo: arquivosList.arquivos[0],
    };

    axios
      .patch(`/api/avaliacaos/avaliacaoEbisaServico`, dataFormated)
      .then(() => {
        toast.success('Avaliação Realizada Com Sucesso!');
        navigate('/solicitacao');
      })
      .catch(() => {
        toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
      });
    // Caso a solicitação não tenha sido aceita
    axios
      .patch(`/api/avaliacaos/avaliacaoEbisaServico`, dataFormated)
      .then(() => {
        toast.success('Avaliação Realizada Com Sucesso!');
        navigate('/solicitacao');
      })
      .catch(() => {
        toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
      });
  };

  const handleRemoveEquipe = (equipe: IEquipe) => {
    setDataAvalicao(prevState => {
      // Obtenha a lista atual de equipes, ou inicialize como vazio se não existir.
      const equipesAtuais = prevState?.equipes || [];

      // Filtre para remover a equipe específica.
      const equipesAtualizadas = equipesAtuais.filter(e => e !== equipe);

      // Retorne o novo estado com a equipe removida.
      return {
        ...prevState, // Preserve outros campos do estado.
        equipes: equipesAtualizadas,
      };
    });
  };

  const handleAddEquipe = (equipe: IEquipe) => {
    setDataAvalicao(prevState => {
      // Se o estado anterior for indefinido ou não tiver "equipes", inicialize um array vazio.
      const equipesAtuais = prevState?.equipes || [];

      // Verifique se a equipe já está no array para evitar duplicatas.
      const equipeJaAdicionada = equipesAtuais.some(e => e === equipe);

      if (equipeJaAdicionada) {
        // Retorne o estado anterior se a equipe já existir.
        return prevState;
      }

      // Adicione a nova equipe ao array.
      return {
        ...prevState, // Mantenha outros campos do estado anterior.
        equipes: [...equipesAtuais, equipe], // Adicione a equipe.
      };
    });
  };

  return (
    <>
      <div className="solicitacao-create-container">
        <h2>Avaliar Solicitação</h2>

        <div className="solicitacao-create-data-container">
          <div>
            <Row>
              <Col>
                <Label>{'Observação'}</Label>
                <Input
                  type="textarea"
                  placeholder={'Observação'}
                  onChange={e => setDataAvalicao({ ...dataAvaliacao, resposta: e.target.value })}
                  value={dataAvaliacao?.resposta}
                />
              </Col>

              <>
                {solicitacaoData?.solicitacao?.tipoSolicitacao === tipoSolicitacao.Servico && (
                  <>
                    <Col>
                      <div className="inventario-container">
                        <span>Equipes</span>

                        <div className="inventario-container-data">
                          <div className="itens-list">
                            {equipeEntities && equipeEntities.length > 0 ? (
                              equipeEntities
                                .filter(data => {
                                  // Verifique se a equipe não está em dataAvaliacao.equipes
                                  return !dataAvaliacao.equipes?.some(equipe => equipe.id === data.id);
                                })
                                .map((data, key) => (
                                  <React.Fragment key={key}>
                                    <div className="itens-container">
                                      <div className="itens-container-text">
                                        <span>{data?.apelido}</span>
                                      </div>

                                      <Button className="itens-container-icon-plus" onClick={() => handleAddEquipe(data)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                      </Button>
                                    </div>
                                  </React.Fragment>
                                ))
                            ) : (
                              // Caso equipeEntities esteja vazio, exiba uma mensagem.
                              <Alert color="warning"> Sem disponibilidade de equipes</Alert>
                            )}

                            {/* Verifique se todas as equipes foram adicionadas */}
                            {equipeEntities?.every(data => dataAvaliacao.equipes?.some(equipe => equipe.id === data.id)) &&
                              equipeEntities?.length !== 0 && <Alert color="warning"> Todas as Equipes já foram adicionadas</Alert>}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="inventario-container">
                        <span>Equipes Selecionadas</span>

                        <div className="inventario-container-data">
                          <div className="itens-list">
                            {dataAvaliacao &&
                              dataAvaliacao?.equipes &&
                              dataAvaliacao?.equipes?.map((data, key) => (
                                <React.Fragment key={key}>
                                  <div className="itens-container">
                                    <div className="itens-container-text">
                                      <span>{data?.apelido}</span>
                                    </div>

                                    <Button className="itens-container-icon-minus" onClick={() => handleRemoveEquipe(data)}>
                                      <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                  </div>
                                </React.Fragment>
                              ))}

                            {dataAvaliacao && dataAvaliacao?.equipes && dataAvaliacao?.equipes?.length === 0 && (
                              <Alert color="warning">Nenhuma Equipe Selecionada</Alert>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                )}

                {solicitacaoData?.solicitacao?.tipoSolicitacao === tipoSolicitacao.Material && (
                  <Col>
                    <div className="inventario-container">
                      <span>Itens Selecionados</span>

                      <div className="inventario-container-data">
                        <div className="itens-list">
                          {solicitacaoData &&
                            solicitacaoData?.itens?.length > 0 &&
                            solicitacaoData?.itens?.map((data, key) => (
                              <React.Fragment key={key}>
                                <div className="itens-container">
                                  <div className="itens-container-text">
                                    <span>{data?.item?.nomeItem}</span>
                                  </div>

                                  <div className="itens-container-icon">
                                    <span>{data?.quantidade}</span>
                                  </div>
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                )}

                <Row style={{ marginTop: '1em' }}>
                  <Col>
                    <Row>
                      <h4 style={{textAlign: 'center'}}>Enviar Orçamento</h4>
                    </Row>
                    <Row>
                      <DragAndDrop arquivoList={arquivosList} setArquivoList={setArquivosList} />
                    </Row>
                  </Col>
                </Row>
              </>
            </Row>
          </div>
        </div>

        <div className="buttons-container">
          <Button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span> Voltar </span>
          </Button>

          <Button onClick={() => handleSaveAvaliacaoSolicitacao()}>
            <span> Salvar Avaliação </span>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SolicitacaoEbisaAvaliacao;
