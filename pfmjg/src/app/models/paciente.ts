import { Agendamento } from "./agendamento/agendamento";
import { Consulta } from "./consulta/consulta";

// interface IPaciente {}
export class Paciente {

    idPaciente?: number;
    cpf?: string;
    nome?: string;
    dataNascimento?: Date;
    cidade?: string;
    estado?: string;
    telefone?: string;
    situacao?: string;

}
