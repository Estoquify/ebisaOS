import React from 'react';
import ModalStockOpen from './ModalStockOpen';
import ModalStockClose from './ModalStockClose';
import { IStockDTO } from 'app/shared/model/StockDTO.model';

export enum TypeModal {
  abrirSolicitacao = 'abrirSolicitacao',
  fecharSolicitacao = 'fecharSolicitacao',
}

interface IModalStock {
  typeModal: TypeModal;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  data?: IStockDTO;
}

const ModalStock: React.FC<IModalStock> = props => {
  const renderContent = () => {
    switch (props.typeModal) {
      case TypeModal.abrirSolicitacao:
        return <ModalStockOpen isOpen={props?.isOpen} setIsOpen={props?.setIsOpen} data={props?.data} />;

      case TypeModal.fecharSolicitacao:
        return <ModalStockClose isOpen={props?.isOpen} setIsOpen={props?.setIsOpen} data={props?.data} />;

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default ModalStock;
