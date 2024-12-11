import dayjs from 'dayjs';
import { IUnidade } from 'app/shared/model/unidade.model';
import { IItemSelecionados } from './itemSelecionados.models';
import tipoSolicitacao from '../enum/TipoSolicitacao';
import { ISolicitacao } from './solicitacao.model';

export interface ISolicitacaoDTO {
  solicitacao?: ISolicitacao | null
  itensSelecionados?: Array<IItemSelecionados> | null;
}

export const defaultValue: Readonly<ISolicitacaoDTO> = {};
