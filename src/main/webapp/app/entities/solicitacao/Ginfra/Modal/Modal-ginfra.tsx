import { faCheck, faChevronLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import axios from 'axios';
import { toNumber } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import './Modal-ginfra.scss';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';

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

  const validate = () => {
    if (!dataAvaliacao) {
      toast.error('Dados de avaliação ausentes.');
      return false;
    }

    if (dataAvaliacao.prioridade === 0 && dataAvaliacao.aprovacao === true) {
      toast.info('Informe uma Prioridade.');
      return false;
    }

    if (!!dataAvaliacao.prazoDate && !dayjs(dataAvaliacao.prazoDate).isAfter(dayjs()) && dataAvaliacao.aprovacao === true) {
      toast.info('A data do prazo deve estar no futuro.');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    const dataFormated: IAvaliacaoModals = {
      ...dataAvaliacao,
      idSolicitacao: solicitacaoId,
    };

    axios
      .patch(`/api/avaliacaos/avaliacaoGinfra`, dataFormated)
      .then(res => {
        toast.success('Avaliação Realizada Com Sucesso!');
        navigate('/solicitacao');
      })
      .catch(err => {
        toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
      });
  };

  const onSubmit = () => {
    if (validate()) {
      handleSave();
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
                  <span>Pausar</span>
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </Col>
            </Row>
          </div>

          {dataAvaliacao?.aprovacao !== undefined && (
            <div>
              <Row>
                {dataAvaliacao?.aprovacao !== false && (
                  <>
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

                    <Col>
                      <Label>Prazo</Label>
                      <Input
                        type="datetime-local"
                        onChange={e => setDataAvalicao({ ...dataAvaliacao, prazoDate: dayjs(e.target.value?.toString()) })}
                        value={dataAvaliacao?.prazoDate ? dataAvaliacao.prazoDate.format('YYYY-MM-DDTHH:mm') : ''}
                      />
                    </Col>
                  </>
                )}
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
              <Button onClick={() => onSubmit()} disabled={dataAvaliacao?.aprovacao === undefined}>
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
