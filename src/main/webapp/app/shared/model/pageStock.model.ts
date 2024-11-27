export interface IStockPag {
    idStock?: number;
    nomeItem?: string | null;
    lastModifiedDate?: Date | null;
    nomeSetor?: string | null;
    quantItem?: number | null;
    quantMax?: number | null;
    aberta?: boolean | null;
  }
  
  export const defaultValue: Readonly<IStockPag> = {};
  