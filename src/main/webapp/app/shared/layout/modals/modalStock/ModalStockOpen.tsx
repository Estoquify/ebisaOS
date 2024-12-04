import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { toNumber } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons';

import './ModalStock.scss';
import { IStockDTO } from 'app/shared/model/StockDTO.model';
import { IStock } from 'app/shared/model/stock.model';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ISolicitacaoCompra } from 'app/shared/model/solicitacao-compra.model';
import { numberMask } from 'app/shared/util/Misc';

interface IModalStockOpen {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  data?: IStockDTO;
}

const ModalStockOpen = (props: IModalStockOpen) => {
  const { isOpen, setIsOpen, data } = props;

  const [solicitacaoCompra, setSolicitacaoCompra] = useState<ISolicitacaoCompra>({ quantSolicitada: 0, aberta: true });

  useEffect(() => {
    axios
      .get(`/api/stocks/${data?.idStock}`)
      .then(res => {
        setSolicitacaoCompra({ ...solicitacaoCompra, stock: res?.data });
      })
      .catch(err => {
        toast.info('Não foi encontrado nenhuma informação sobre esse stoque em questão');
      });
  }, []);

  const validateCreateSolicitacao = (): boolean => {
    if (solicitacaoCompra?.quantSolicitada === 0) {
      toast.info('Informe uma quantidade para a solicitação dos itens');
      return false;
    } else if (solicitacaoCompra?.quantSolicitada > solicitacaoCompra?.stock?.quantMax) {
      toast.info('A quantidade solicitada excede o tamanho máximo permitido no estoque.');
      return false;
    } else if ((solicitacaoCompra?.quantSolicitada + solicitacaoCompra?.stock?.quantItem) > solicitacaoCompra?.stock?.quantMax) {
      toast.info('Não há espaço disponível suficiente no estoque para a quantidade solicitada.');
      return false;
    }
    return true;
  };

  const handleCreateSolicitacao = () => {
    if (validateCreateSolicitacao()) {
      axios
        .post(`/api/solicitacao-compras`, solicitacaoCompra)
        .then(res => {
          toast.success('Solicitação de compra criada com sucesso');
          setIsOpen(false);
        })
        .catch(err => {
          toast.error('Aconteceu algum erro inesperado');
        });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} className="modal-stock-container">
      <ModalHeader className="modal-stock-header-container">Abrir Solicitação</ModalHeader>
      <ModalBody className="modal-stock-body-container">
        <div className="modal-stock-body-input-container">
          <Label>Informe a quantidade que foi solicitada</Label>
          <Input
            type="text"
            value={solicitacaoCompra?.quantSolicitada}
            onChange={e => setSolicitacaoCompra({ ...solicitacaoCompra, quantSolicitada: toNumber(numberMask(e.target.value)) })}
            placeholder="Informe a quantidade aqui"
          />
        </div>
        <div className="modal-stock-body-input-container">
          <Label>Informe uma descrição para a solicitação de compra</Label>
          <Input
            type="textarea"
            value={solicitacaoCompra?.descricao}
            onChange={e => setSolicitacaoCompra({ ...solicitacaoCompra, descricao: e.target.value })}
            placeholder="Informe uma descrição aqui"
          />
        </div>
      </ModalBody>

      <ModalFooter className="modal-stock-footer-container">
        <Button onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </Button>

        <Button onClick={() => handleCreateSolicitacao()}>
          Salvar
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalStockOpen;
