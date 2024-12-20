import { IEquipe } from 'app/shared/model/equipe.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { Dayjs } from 'dayjs';

export interface ISolicitacaoGinfraListagem {
  id?: number;
  nomeSetor?: string | null;
  prazoDate?: Dayjs | null;
  createdDate?: Dayjs | null;
  siglaUnidade?: string | null;
  tipoSolicitacao?: string | null;
  titulo?: string | null;
}

export const defaultValue: Readonly<ISolicitacaoGinfraListagem> = {};
