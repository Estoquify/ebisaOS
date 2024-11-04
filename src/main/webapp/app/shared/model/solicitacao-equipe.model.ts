import { IEquipe } from 'app/shared/model/equipe.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';

export interface ISolicitacaoEquipe {
  id?: number;
  equipe?: IEquipe | null;
  solicitacao?: ISolicitacao | null;
}

export const defaultValue: Readonly<ISolicitacaoEquipe> = {};
