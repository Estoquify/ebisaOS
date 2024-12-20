import { faCheck, faChevronLeft, faFloppyDisk, faMinus, faPlus, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import axios from 'axios';
import { toNumber } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntitiesAvailable } from 'app/entities/equipe/equipe.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';

interface IModalEbisaServico {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  solicitacaoId: number;
}

// Esse precisa enviar a equipe diferente dos demais
const ModalEbisaServico = (props: IModalEbisaServico) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen, setIsOpen, solicitacaoId } = props;

  const equipeEntities: IEquipe[] = useAppSelector(state => state?.equipe?.entities);

  const [dataAvaliacao, setDataAvalicao] = useState<IAvaliacaoModals>({
    aprovacao: undefined,
    prioridade: 0,
    resposta: '',
    equipes: [],
  });

  useEffect(() => {
    dispatch(getEntitiesAvailable());
  }, []);

  const handleReturnButton = () => {
    setDataAvalicao({ aprovacao: undefined, prioridade: 0, resposta: '' });
    setIsOpen(false);
  };

  const handleSave = () => {
    if (dataAvaliacao?.aprovacao) {
      if (dataAvaliacao?.equipes?.length !== 0) {
        const dataFormated: IAvaliacaoModals = {
          ...dataAvaliacao,
          idSolicitacao: solicitacaoId,
        };

        axios
          .patch(`/api/avaliacaos/avaliacaoEbisaServico`, dataFormated)
          .then(res => {
            toast.success('Avaliação Realizada Com Sucesso!');
            navigate('/solicitacao');
          })
          .catch(err => {
            toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
          });
      } else {
        toast.info('Escolha pelo menos uma equipe');
      }
    } else {
      if (dataAvaliacao?.resposta?.length >= 10) {
        const dataFormated: IAvaliacaoModals = {
          ...dataAvaliacao,
          idSolicitacao: solicitacaoId,
        };

        axios
          .patch(`/api/avaliacaos/avaliacaoEbisaServico`, dataFormated)
          .then(res => {
            toast.success('Avaliação Realizada Com Sucesso!');
            navigate('/solicitacao');
          })
          .catch(err => {
            toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
          });
      } else {
        toast.info('Escreva pelo menos 10 caracteres');
      }
    }
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
      <Modal isOpen={isOpen} toggle={() => handleReturnButton()} centered className="modal-ebisa-container">
        <ModalHeader>
          <h4>Avaliar</h4>
        </ModalHeader>
        <ModalBody>
          <div>
            <Row>
              <Col>
                <Button color={'success'} size="lg" onClick={() => setDataAvalicao({ ...dataAvaliacao, aprovacao: true })}>
                  <span>Aceitar</span>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>

              <Col>
                <Button color={'danger'} size="lg" onClick={() => setDataAvalicao({ ...dataAvaliacao, aprovacao: false })}>
                  <span>Rejeitar</span>
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </Col>
            </Row>
          </div>

          {dataAvaliacao?.aprovacao !== undefined && (
            <div>
              <Row>
                <Col>
                  <Label>{dataAvaliacao?.aprovacao ? 'Observação' : 'Justificativa'}</Label>
                  <Input
                    type="textarea"
                    placeholder={dataAvaliacao?.aprovacao ? 'Observação' : 'Justificativa'}
                    onChange={e => setDataAvalicao({ ...dataAvaliacao, resposta: e.target.value })}
                    value={dataAvaliacao?.resposta}
                  />
                </Col>

                {dataAvaliacao?.aprovacao === true && (
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
                            {equipeEntities?.every(data => dataAvaliacao.equipes?.some(equipe => equipe.id === data.id)) && (
                              <Alert color="warning"> Todas as Equipes já foram adicionadas</Alert>
                            )}
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
              </Row>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Row>
            <Col>
              <Button onClick={() => handleReturnButton()}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span> Voltar </span>
              </Button>
            </Col>

            <Col>
              <Button onClick={() => handleSave()} disabled={dataAvaliacao?.aprovacao === undefined}>
                <span> Salvar </span>
                <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalEbisaServico;
