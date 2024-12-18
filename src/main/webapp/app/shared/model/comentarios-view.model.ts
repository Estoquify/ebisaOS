import { IStock } from 'app/shared/model/stock.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IEquipe } from './equipe.model';
import { IItemSelecionados } from './itemSelecionados.models';
import { Dayjs } from 'dayjs';

export interface IComentarioView {
  resposta?: string | null;
  nomeUsuario?: string | null;
  dataAvaliacao?: Dayjs | null;
  tipoComentario?: string | null;
}

export const defaultValue: Readonly<IComentarioView> = {};