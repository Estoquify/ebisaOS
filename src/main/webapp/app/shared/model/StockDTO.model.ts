import { IItem } from 'app/shared/model/item.model';
import { ISetor } from 'app/shared/model/setor.model';

export interface IStockDTO {
  idStock?: number;
  quantItem?: number | null;
  quantMax?: number | null;
  lastModifiedDate?: Date | null;
  nomeItem?: string | null;
  nomeSetor?: string | null;
  aberta?: boolean | null
}

export const defaultValue: Readonly<IStockDTO> = {};
