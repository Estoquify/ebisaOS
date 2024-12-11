import dayjs from 'dayjs';
import { IUnidade } from 'app/shared/model/unidade.model';
import { IItemSelecionados } from './itemSelecionados.models';
import tipoSolicitacao from '../enum/TipoSolicitacao';
import { ISetorUnidade } from './setor-unidade.model';

export interface ISolicitacao {
  id?: number;
  prazoDate?: dayjs.Dayjs | null;
  createDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
  finishDate?: dayjs.Dayjs | null;
  aberta?: boolean | null;
  prioridade?: boolean | null;
  descricao?: string | null;
  titulo?: string | null;
  observacao?: string | null;
  setorUnidade?: ISetorUnidade | null;
  // itensSelecionados?: Array<IItemSelecionados> | null;
  tipoSolicitacao?: tipoSolicitacao | null
}

export const defaultValue: Readonly<ISolicitacao> = {
  aberta: false,
};
