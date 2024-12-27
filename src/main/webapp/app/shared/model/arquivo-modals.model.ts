import dayjs from 'dayjs';
import { IArquivo } from './arquivo.model';

export interface IArquivoModal {
    arquivos?: Array<IArquivo> | null
    idSolicitacao?: number | null;
}
