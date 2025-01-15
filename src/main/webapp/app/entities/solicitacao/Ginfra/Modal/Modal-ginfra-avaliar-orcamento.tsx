import { faCheck, faChevronLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import './Modal-ginfra.scss';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

interface IModalGinfra {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  solicitacaoId: number;
}

const ModalGinfraAvaliarOrcamento = (props: IModalGinfra) => {
  const navigate = useNavigate();

  const { isOpen, setIsOpen, solicitacaoId } = props;

  const [dataAvaliacao, setDataAvalicao] = useState<IAvaliacaoModals>({
    aprovacao: undefined,
    prioridade: 0,
    resposta: '',
  });
  const [fileDownloaded, setFileDownloaded] = useState<boolean>(false);

  const handleReturnButton = () => {
    setDataAvalicao({ aprovacao: undefined, prioridade: 0, resposta: '' });
    setIsOpen(false);
    setFileDownloaded(false);
  };

  const handleSave = () => {
    axios
      .get(`/api/avaliacaos/avaliarOrcamento/${solicitacaoId}/${dataAvaliacao?.aprovacao}`)
      .then(res => {
        toast.success('Avaliação Realizada Com Sucesso!');
        navigate('/solicitacao');
      })
      .catch(err => {
        toast.error('Ops..., Ocorreu Algum erro inesperado, Tente novamente mais tarde');
      });
  };

  const onSubmit = () => {
    handleSave();
  };

  const handleDownloadFile = () => {
    axios
      .get(`/api/arquivos/arquivoEbisa/${solicitacaoId}`)
      .then(response => {
        if (response.data?.documento && response.data?.documentoContentType) {
          const { documento, documentoContentType } = response.data;

          // Converter o conteúdo base64 para um blob
          const byteCharacters = atob(documento); // Decodificar o base64
          const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: documentoContentType });

          // Criar um link para download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `arquivo.${documentoContentType.split('/')[1]}`; // Define o nome do arquivo com base no tipo
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setFileDownloaded(true);

          // Limpar a URL gerada
          URL.revokeObjectURL(link.href);
        } else {
          toast.error('Arquivo inválido ou não encontrado.');
        }
      })
      .catch(error => {
        toast.error('Erro ao baixar o arquivo. Tente novamente mais tarde.');
      });
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
                <Button onClick={() => handleDownloadFile()} color="primary">
                  <span>Baixar Orçamento</span>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  color={'success'}
                  size="lg"
                  onClick={() => setDataAvalicao({ ...dataAvaliacao, aprovacao: true })}
                  disabled={!fileDownloaded}
                >
                  <span>Aceitar</span>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>

              <Col>
                <Button
                  color={'danger'}
                  size="lg"
                  onClick={() => setDataAvalicao({ ...dataAvaliacao, aprovacao: false })}
                  disabled={!fileDownloaded}
                >
                  <span>Rejeitar</span>
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </Col>
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

export default ModalGinfraAvaliarOrcamento;
