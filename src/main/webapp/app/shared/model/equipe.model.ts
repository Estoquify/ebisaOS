import { IColaborador } from 'app/shared/model/colaborador.model';

export interface IEquipe {
  id?: number;
  apelido?: string | null;
  descricao?: string | null;
  ocupada?: boolean | null;
  ativa?: boolean | null;
  colaborador?: IColaborador | null;
}

export const defaultValue: Readonly<IEquipe> = {
  ocupada: false,
  ativa: false,
};
