import { IEquipe } from 'app/shared/model/equipe.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { Dayjs } from 'dayjs';

export interface ISolicitacaoEbisaListagem {
  id?: number;
  nomeSetor?: string | null;
  prazoDate?: Dayjs | null;
  createdDate?: Dayjs | null;
  siglaUnidade?: string | null;
  prioridade?: number | null;
  tipoSolicitacao?: string | null;
  orcamento?: boolean | null;
  titulo?: string | null;
  avaliacao?: boolean | null;
}

export const defaultValue: Readonly<ISolicitacaoEbisaListagem> = {};
