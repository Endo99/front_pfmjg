import { Categoria } from "../categoria/categoria";
import { Conta } from "../conta/conta";
import { Paciente } from "../paciente";

export class ControleCaixa {

    idControleCaixa?: number;
    paciente?: Paciente;
    conta?: Conta[] = [];
    data?: Date;
    produtoOuCliente?: string;
    preco?: number;
    formaPagamento?: string;
    categoria?: Categoria;
    descricaoControle?: string;
}
