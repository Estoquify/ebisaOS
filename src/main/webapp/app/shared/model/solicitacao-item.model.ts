import { IStock } from 'app/shared/model/stock.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';

export interface ISolicitacaoItem {
  id?: number;
  stock?: IStock | null;
  solicitacao?: ISolicitacao | null;
}

export const defaultValue: Readonly<ISolicitacaoItem> = {};
