import dayjs from 'dayjs';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';

export interface IComentario {
  id?: number;
  respostas?: string | null;
  createdDate?: dayjs.Dayjs | null;
  avaliacao?: IAvaliacao | null;
}

export const defaultValue: Readonly<IComentario> = {};
