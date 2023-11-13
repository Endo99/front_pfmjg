import { Categoria } from "../categoria/categoria";

export class Nutricionista {

    id?: number;
    nome?: string;
    cpf?: string;
    telefone?: string;
    situacao?: string;
    categoria?: Categoria;
    descricao?: string;
}
