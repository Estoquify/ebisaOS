import dayjs from 'dayjs';

export interface IItem {
  id?: number;
  nomeItem?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IItem> = {};
