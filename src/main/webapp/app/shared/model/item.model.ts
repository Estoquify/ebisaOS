import dayjs from 'dayjs';

export interface IItem {
  id?: number;
  nomeItem?: string | null;
  createDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IItem> = {};
