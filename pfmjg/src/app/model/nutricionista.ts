import { Categoria } from "./categoria";

export interface Nutricionista {
    id: number;
    cpf: String;
    nome: string;
    descricao: string;
    telefone: string;
    situacao: string;
    categoriasDescricao: string[];
    categoriasIds: number[];
    categorias: Categoria[];
}