export interface ILogin {
    cpf?: string | null;
    senha?: string | null;
}

export const defaultValue: Readonly<ILogin> = {
    cpf: '',
    senha: '',
};
