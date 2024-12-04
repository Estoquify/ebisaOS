import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { toNumber } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { IStockDTO } from 'app/shared/model/StockDTO.model';

import './ModalStock.scss';
import { ISolicitacaoCompra } from 'app/shared/model/solicitacao-compra.model';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IModalStockClose {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  data?: IStockDTO;
}

const ModalStockClose = (props: IModalStockClose) => {
  const { isOpen, setIsOpen, data } = props;

  const handleCloseSolicitacao = () => {
    if (!data?.idStock) {
      toast.info('Não foi encontrado nenhum stock');
      return;
    }

    axios
      .get(`/api/stocks/finalizarCompra/${data?.idStock}`)
      .then(res => {
        toast.success('Solicitação de Compra finalizada com sucesso!');
        setIsOpen(false)
      })
      .catch(err => {
        toast.error('Ocorreu algum erro ao finalizar a solicitação de compra');
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} className="modal-stock-container">
      <ModalHeader className="modal-stock-header-container">Fechar Solicitação</ModalHeader>
      <ModalBody className="modal-stock-body-container">
        <h5> Você tem certeza que vai fechar a solicitação ?</h5>
        <div className="modal-stock-body-buttons-container">
          <Button onClick={() => handleCloseSolicitacao()}>
            <FontAwesomeIcon icon={faCheck} />
            SIM
          </Button>

          <Button onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faX} />
            Não
          </Button>
        </div>
      </ModalBody>

      <ModalFooter className="modal-stock-footer-container">
        <Button onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalStockClose;
