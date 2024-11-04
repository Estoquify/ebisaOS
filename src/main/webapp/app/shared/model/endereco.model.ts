import { IMunicipio } from 'app/shared/model/municipio.model';

export interface IEndereco {
  id?: number;
  logradouro?: string | null;
  cep?: string | null;
  numero?: string | null;
  bairro?: string | null;
  municipio?: IMunicipio | null;
}

export const defaultValue: Readonly<IEndereco> = {};
