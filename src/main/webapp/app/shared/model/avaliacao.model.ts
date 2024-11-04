import dayjs from 'dayjs';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';

export interface IAvaliacao {
  id?: number;
  avalicao?: string | null;
  aprovacao?: boolean | null;
  creatDate?: dayjs.Dayjs | null;
  solicitacao?: ISolicitacao | null;
}

export const defaultValue: Readonly<IAvaliacao> = {
  aprovacao: false,
};
