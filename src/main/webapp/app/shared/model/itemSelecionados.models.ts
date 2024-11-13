import { IItem } from "./item.model";

export interface IItemSelecionados {
    quantidade?: number;
    item?: IItem
}

export const defaultValue: Readonly<IItemSelecionados> = {};
