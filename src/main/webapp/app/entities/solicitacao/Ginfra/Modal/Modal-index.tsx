import { IAvaliacaoModals } from 'app/shared/model/avaliacao-modals.model';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import ModalGinfraAvaliarOrcamento from './Modal-ginfra-avaliar-orcamento';
import React from 'react';
import ModalGinfra from './Modal-ginfra';
import { ISolicitacaoViewServicoDto } from 'app/shared/model/solicitacao-view-servico-dto.model';

interface IModalIndex {
  dataAvaliacao?: ISolicitacaoViewServicoDto;
  isOpen?: boolean | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const ModalIndex = (props: IModalIndex) => {
  const { dataAvaliacao, isOpen, setIsOpen } = props;

  const handleModalChange = () => {
    if (!dataAvaliacao?.avaliacaoOrcamento && dataAvaliacao?.foiAvaliado && dataAvaliacao?.orcamentoAberto) {
      return <ModalGinfraAvaliarOrcamento isOpen={isOpen} setIsOpen={setIsOpen} solicitacaoId={dataAvaliacao?.solicitacao?.id} />;
    }

    if (!dataAvaliacao?.foiAvaliado) {
      return <ModalGinfra isOpen={isOpen} setIsOpen={setIsOpen} solicitacaoId={dataAvaliacao?.solicitacao?.id} />;
    }
  };

  return handleModalChange();
};

export default ModalIndex;
