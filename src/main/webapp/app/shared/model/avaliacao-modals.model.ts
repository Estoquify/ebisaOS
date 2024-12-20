import { IEquipe } from './equipe.model';

export interface IAvaliacaoModals {
  resposta?: string | null;
  idSolicitacao?: number | null;
  aprovacao?: boolean | null;
  prioridade?: number | null;
  equipes?: IEquipe[] | null
}

export const defaultValue: Readonly<IAvaliacaoModals> = {
  aprovacao: false,
};
