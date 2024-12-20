import { faCheck, faChevronLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import axios from 'axios';
import { toNumber } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';

interface IModalEbisaMaterial {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  solicitacao: ISolicitacaoViewServicoDto;
}

const ModalEbisaMaterial = (props: IModalEbisaMaterial) => {
  const navigate = useNavigate();

  const { isOpen, setIsOpen, solicitacao } = props;

  const [dataAvaliacao, setDataAvalicao] = useState<IAvaliacaoModals>({
    aprovacao: undefined,
    prioridade: 0,
    resposta: '',
  });

  const handleReturnButton = () => {
    setDataAvalicao({ aprovacao: undefined, prioridade: 0, resposta: '' });
    setIsOpen(false);
  };

  const handleSave = () => {
    const dataFormated: IAvaliacaoModals = {
      ...dataAvaliacao,
      idSolicitacao: solicitacao?.solicitacao?.id,
    };

    if (dataAvaliacao?.resposta?.length >= 10) {
      axios
        .patch(`/api/avaliacaos/avaliacaoEbisaMaterial`, dataFormated)
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

          <div>
            <Row>
              <Col>
                <div className="inventario-container">
                  <span>Itens Selecionados</span>

                  <div className="inventario-container-data">
                    <div className="itens-list">
                      {solicitacao &&
                        solicitacao?.itens?.length > 0 &&
                        solicitacao?.itens?.map((data, key) => (
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

              {dataAvaliacao?.aprovacao !== undefined && (
                <>
                  <Col>
                    <Label>{dataAvaliacao?.aprovacao ? 'Observação' : 'Justificativa'}</Label>
                    <Input
                      type="textarea"
                      placeholder={dataAvaliacao?.aprovacao ? 'Observação' : 'Justificativa'}
                      onChange={e => setDataAvalicao({ ...dataAvaliacao, resposta: e.target.value })}
                      value={dataAvaliacao?.resposta}
                    />
                  </Col>
                </>
              )}
            </Row>
          </div>
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

export default ModalEbisaMaterial;
