import { Button, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFloppyDisk, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import './Modal.scss';
import { toast } from 'react-toastify';

interface IModalAprovarOuRejeitar {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isServico?: boolean;
}

const ModalAprovarOuRejeitar = (props: IModalAprovarOuRejeitar) => {
  const { isOpen, setIsOpen, isServico } = props;

  const [status, setStatus] = useState<boolean>(true);
  const [text, setText] = useState<string>('');

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    if (text?.length <= 10) {
      toast.info('Escreva mais informações para salvar o dado');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={handleCloseModal} centered className="modal-container" style={isServico ? {maxWidth: '1200px'} : {}}>
        <ModalHeader className="modal-header-container">
          <h1>Avaliar</h1>
        </ModalHeader>
        <ModalBody className="modal-body-container">
          <div className="modal-body-buttons-container">
            <Button onClick={() => setStatus(true)} style={isServico ? {width: '20%'} : {}}>Aceitar</Button>

            <Button onClick={() => setStatus(false)} style={isServico ? {width: '20%'} : {}}>Rejeitar</Button>
          </div>

          {status === true && !isServico && (
            <div className="modal-body-text-container">
              <div className="modal-body-text-header-container">
                <h4> Observação </h4>
              </div>
              <div className="modal-body-text-content-container">
                <Input placeholder="Observação" type="textarea" onChange={e => setText(e.target.value)} value={text} />
              </div>
            </div>
          )}

          {status === true && isServico && (
            <Row className='modal-body-text-isServico-container'>
              <Col className="modal-body-text-container">
                <div className="modal-body-text-header-container">
                  <h4> Observação </h4>
                </div>
                <div className="modal-body-text-content-container">
                  <Input placeholder="Observação" type="textarea" onChange={e => setText(e.target.value)} value={text} />
                </div>
              </Col>

              <Col className='modal-body-text-isServico-equipes-container'>
                <div className='modal-body-text-isServico-equipes-header-container'>
                  <h4>Equipes</h4>
                </div>
                <div className='modal-body-text-isServico-equipes-data-container'>
                  <div className='modal-body-text-isServico-equipes-data-searchbar-container'>
                    <div>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <Input type="text" placeholder='Pesquisa'/>
                  </div>

                  <div className='modal-body-text-isServico-equipes-data-list-container'>
                    <div className='modal-body-text-isServico-equipes-list-data-container'>
                      <div className='modal-body-text-isServico-equipes-list-data-header'>
                        <span> Equipe teste</span>
                      </div>

                      <Button>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>

              <Col className='modal-body-text-isServico-equipes-container'>
                <div className='modal-body-text-isServico-equipes-header-container'>
                  <h4>Equipe</h4>
                </div>
                <div className='modal-body-text-isServico-equipes-data-container'>
                  <div className='modal-body-text-isServico-equipes-data-searchbar-container'>
                    <div>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <Input type="text" placeholder='Pesquisa'/>
                  </div>

                  <div className='modal-body-text-isServico-equipe-data-list-container'>
                    <div className='modal-body-text-isServico-equipe-list-data-container'>
                      <div className='modal-body-text-isServico-equipe-list-data-header'>
                        <span> Equipe teste</span>
                      </div>

                      <Button>
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          {status === false && (
            <div className="modal-body-text-container">
              <div className="modal-body-text-header-container">
                <h4> Justificativa </h4>
              </div>
              <div className="modal-body-text-content-container">
                <Input placeholder="Justificativa" type="textarea" />
              </div>
            </div>
          )}

          <div className="modal-footer-buttons-container">
            <Button onClick={() => handleCloseModal()} style={isServico ? {width: '10%'} : {}}>
              <FontAwesomeIcon icon={faChevronLeft} />
              <span> Voltar </span>
            </Button>

            <Button onClick={() => handleSave()} disabled={text?.length === 0} style={isServico ? {width: '10%'} : {}}>
              <span> Salvar </span>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAprovarOuRejeitar;
