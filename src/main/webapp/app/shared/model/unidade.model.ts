import { IEndereco } from 'app/shared/model/endereco.model';
import { IOrgao } from 'app/shared/model/orgao.model';

export interface IUnidade {
  id?: number;
  nome?: string | null;
  cnpj?: string | null;
  endereco?: IEndereco | null;
  orgao?: IOrgao | null;
}

export const defaultValue: Readonly<IUnidade> = {};
