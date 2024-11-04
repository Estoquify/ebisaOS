export interface IMunicipio {
  id?: number;
  codigoIBGE?: number | null;
  nomeMunicipio?: string | null;
}

export const defaultValue: Readonly<IMunicipio> = {};
