import { Agendamento } from "./agendamento/agendamento";
import { Consulta } from "./consulta/consulta";

// interface IPaciente {}
export class Paciente {

    idPaciente?: number;
    cpf?: string;
    nomePaciente?: string;
    dataNascimentoPaciente?: Date;
    idadePaciente?: number;
    cidade?: string;
    estado?: string;
    telefone?: string;
    agendamento?: Agendamento;
    consulta?: Consulta;
    informacaoExtra?: string;

}
