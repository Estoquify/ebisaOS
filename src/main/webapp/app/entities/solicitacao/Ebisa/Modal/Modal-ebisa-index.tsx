import tipoSolicitacao from 'app/shared/enum/TipoSolicitacao';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';
import React from 'react';
import ModalEbisaMaterial from './Modal-ebisa-material';
import ModalEbisaServico from './Modal-ebisa-servico';

import './Modal-ebisa.scss'

interface IModalEbisaIndex {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  solicitacaoData: ISolicitacaoViewServicoDto;
}

const ModalEbisaIndex = (props: IModalEbisaIndex) => {
  const { isOpen, setIsOpen, solicitacaoData } = props;

  const handleReturnModalType = () => {
    if(solicitacaoData?.solicitacao?.tipoSolicitacao === tipoSolicitacao.Material) {
      return <ModalEbisaMaterial isOpen={isOpen} setIsOpen={setIsOpen} solicitacao={solicitacaoData}/>
    } else if (solicitacaoData?.solicitacao?.tipoSolicitacao === tipoSolicitacao.Servico) {
      return <ModalEbisaServico isOpen={isOpen} setIsOpen={setIsOpen} solicitacaoId={solicitacaoData?.solicitacao?.id}/>
    }
  };

  return (
    <>
      {handleReturnModalType()}
    </>
  );
};

export default ModalEbisaIndex