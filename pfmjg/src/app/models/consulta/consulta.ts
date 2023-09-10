import { Agendamento } from "../agendamento/agendamento";
import { Paciente } from "../paciente";

export class Consulta {

    idConsulta?: number;

    paciente?: Paciente;

    agendamento?: Agendamento;

    dataInicioConsulta?: Date;

    dataConsultaAtual?: Date;

    dataConsultaAlterada?: Date;

    dataConsultaAntiga?: Date;

    dataUltimaConsulta?: Date;

    tipoConsulta?: String;

    formaPagamento?: String;

    mesesAcompanhado?: number;

}
