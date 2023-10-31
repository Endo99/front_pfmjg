import { Paciente } from "../paciente";

export class AgendaDto {

    idAgenda?: number;
    paciente?: Paciente;
    dataInicio?: Date;
    descricao?: string;
    horarioInicio?: string;
    horaFinal?: string;
    observacao?: string;

}
