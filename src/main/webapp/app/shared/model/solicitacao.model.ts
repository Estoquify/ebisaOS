import dayjs from 'dayjs';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface ISolicitacao {
  id?: number;
  prazoDate?: dayjs.Dayjs | null;
  createDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
  finishDate?: dayjs.Dayjs | null;
  aberta?: boolean | null;
  descricao?: string | null;
  observacao?: string | null;
  unidade?: IUnidade | null;
}

export const defaultValue: Readonly<ISolicitacao> = {
  aberta: false,
};
