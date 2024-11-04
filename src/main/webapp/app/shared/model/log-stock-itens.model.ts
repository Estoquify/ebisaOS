import dayjs from 'dayjs';
import { IStock } from 'app/shared/model/stock.model';

export interface ILogStockItens {
  id?: number;
  createDade?: dayjs.Dayjs | null;
  quantAtual?: number | null;
  quantAnterior?: number | null;
  updateDate?: dayjs.Dayjs | null;
  stock?: IStock | null;
}

export const defaultValue: Readonly<ILogStockItens> = {};
