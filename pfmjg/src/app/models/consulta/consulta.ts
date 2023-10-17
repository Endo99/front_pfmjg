import { Agendamento } from "../agendamento/agendamento";
import { Paciente } from "../paciente";

export class Consulta {

    idConsulta?: number;

    paciente?: number;

    agendamento?: number;

    dataConsultaAtual?: Date;

    tipoConsulta?: String;

    formaPagamento?: String;

    mesesAcompanhado?: number;

}
