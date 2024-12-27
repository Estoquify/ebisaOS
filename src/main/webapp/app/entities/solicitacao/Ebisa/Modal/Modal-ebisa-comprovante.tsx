import { faCheck, faChevronLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DragAndDrop from 'app/shared/layout/Dropzone/DropzoneComponent';
import { IArquivoModal } from 'app/shared/model/arquivo-modals.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

interface IModalEbisaComprovante {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  idSolicitacao: number;
}

const ModalEbisaComprovante = (props: IModalEbisaComprovante) => {
  const { isOpen, setIsOpen, idSolicitacao } = props;

  const [arquivosList, setArquivosList] = useState<IArquivoModal>({ arquivos: [] });

  const handleReturnButton = () => {
    setArquivosList({ arquivos: [] });
    setIsOpen(false);
  };

  const handleSave = () => {
    const arquivoListModal: IArquivoModal = {
      ...arquivosList,
      idSolicitacao,
    };

    axios
      .post(`/api/arquivos`, arquivoListModal)
      .then(suc => {
        setIsOpen(false);
        setArquivosList({ arquivos: [] });
        toast.success('Solicitação Concluida!');
      })
      .catch(err => {
        toast.error('ocorreu um erro ao finalizar a solicitação');
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
            <DragAndDrop arquivoList={arquivosList} setArquivoList={setArquivosList} />
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
              <Button onClick={() => handleSave()}>
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

export default ModalEbisaComprovante;
