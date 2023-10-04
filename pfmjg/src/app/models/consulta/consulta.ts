import { Agendamento } from "../agendamento/agendamento";
import { Paciente } from "../paciente";

export class Consulta {

    idConsulta?: number;

    paciente?: Paciente;

    agendamento?: Agendamento;

    dataConsultaAtual?: Date;

    dataConsultaInicio?: Date;

    tipoConsulta?: String;

    formaPagamento?: String;

    mesesAcompanhado?: number;

}
