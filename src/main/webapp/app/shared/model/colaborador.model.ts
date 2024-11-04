import { IFuncao } from 'app/shared/model/funcao.model';

export interface IColaborador {
  id?: number;
  nome?: string | null;
  cpf?: string | null;
  funcao?: IFuncao | null;
}

export const defaultValue: Readonly<IColaborador> = {};
