import dayjs from 'dayjs';
import { IStock } from 'app/shared/model/stock.model';

export interface ISolicitacaoCompra {
  id?: number;
  descricao?: string | null;
  quantSolicitada?: number | null;
  createDate?: dayjs.Dayjs | null;
  aberta?: boolean | null;
  stock?: IStock | null;
}

export const defaultValue: Readonly<ISolicitacaoCompra> = {
  aberta: false,
};
