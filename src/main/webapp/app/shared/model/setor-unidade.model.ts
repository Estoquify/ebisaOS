import { IUnidade } from "./unidade.model";

export interface ISetorUnidade {
    id?: number;
    nome?: string | null;
    unidade?: IUnidade | null;
  }
  
  export const defaultValue: Readonly<ISetorUnidade> = {};
  