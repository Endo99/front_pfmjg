import { Agendamento } from "../agendamento/agendamento";
import { Paciente } from "../paciente";

export class Consulta {

    idConsulta?: number;

    paciente?: Paciente;

    agendamento?: Agendamento;

    dataConsultaAtual?: Date;

    tipoConsulta?: String;

    formaPagamento?: String;

}
