import { IStock } from 'app/shared/model/stock.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IEquipe } from './equipe.model';
import { IItemSelecionados } from './itemSelecionados.models';
import { IComentarioView } from './comentarios-view.model';

export interface ISolicitacaoViewServicoDto {
  itens?: IItemSelecionados[] | null;
  equipes?: IEquipe[] | null;
  solicitacao?: ISolicitacao | null;
  comentarios?: IComentarioView[] | null;
}

export const defaultValue: Readonly<ISolicitacaoViewServicoDto> = {};