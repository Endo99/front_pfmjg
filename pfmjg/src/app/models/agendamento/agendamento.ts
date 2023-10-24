import { Consulta } from "../consulta/consulta";
import { Paciente } from "../paciente";

export class Agendamento {

    idAgendamento?: number;
    paciente?: Paciente;
    dataInicio?: Date;
    descricao?: String; // nome do evento
    horarioInicio?: Date;
    horaFinal?: Date;
    observacao?: String;
    
}
