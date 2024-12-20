import { faCheck, faChevronLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import axios from 'axios';
import { toNumber } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import './Modal-ginfra.scss';
import { toast } from 'react-toastify';

interface IModalGinfra {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  solicitacaoId: number;
}

const ModalGinfra = (props: IModalGinfra) => {
  const navigate = useNavigate();

  const { isOpen, setIsOpen, solicitacaoId } = props;

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
        idSolicitacao: solicitacaoId
    }

    if (dataAvaliacao?.prioridade !== 0) {
      axios
        .patch(`/api/avaliacaos/avaliacaoGinfra`, dataFormated)
        .then(res => {
          toast.success('Avaliação Realizada Com Sucesso!');
          navigate("/solicitacao")
        })
        .catch(err => {
          toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
        });
    } else {
      toast.info('Informe uma prioridade para a solicitação');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={() => handleReturnButton()} centered className="modal-ginfra-container">
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
                  <Label>Prioridade</Label>
                  <Input
                    type="select"
                    onChange={e => setDataAvalicao({ ...dataAvaliacao, prioridade: toNumber(e.target.value) })}
                    value={dataAvaliacao?.prioridade}
                  >
                    <option>Selecione Uma Prioridade</option>
                    <option value={1}>Urgente</option>
                    <option value={2}>Alta</option>
                    <option value={3}>Baixa</option>
                  </Input>
                </Col>
              </Row>
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

export default ModalGinfra;
