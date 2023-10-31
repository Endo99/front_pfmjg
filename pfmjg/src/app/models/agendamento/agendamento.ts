import { Consulta } from "../consulta/consulta";
import { Paciente } from "../paciente";

export class Agendamento {

    idAgendamento?: number;
    paciente?: Paciente;
    dataInicio?: Date;
    descricao?: String; // nome do evento
    horarioInicio?: string;
    horaFinal?: string;
    observacao?: String;
    
}
