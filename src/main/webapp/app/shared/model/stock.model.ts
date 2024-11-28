import { IItem } from 'app/shared/model/item.model';
import { ISetor } from 'app/shared/model/setor.model';

export interface IStock {
  id?: number;
  quantItem?: number | null;
  quantMax?: number | null;
  lastModifiedDate?: Date | null;
  item?: IItem | null;
  setor?: ISetor | null;
}

export const defaultValue: Readonly<IStock> = {};
