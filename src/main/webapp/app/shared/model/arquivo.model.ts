import dayjs from 'dayjs';
import { ISolicitacao } from './solicitacao.model';

export interface IArquivo {
  id?: number;
  creatDate?: dayjs.Dayjs | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  createBy?: string | null;
  lastModifiedBy?: string | null;
  documento?: string | null;
  // Usado apenas para apresentação
  nomeDocumento?: string | null;
  documentoContentType?: string | null;
  tipoDocumento?: string | null;
  solicitacao?: ISolicitacao | null;
}
