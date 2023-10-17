import { Consulta } from "../consulta/consulta";
import { Paciente } from "../paciente";

export class Agendamento {

    idAgendamento?: number;
    idPaciente?: number;
    idConsulta?: number;
    dataInicio?: Date;
    descricao?: String; // nome do evento
    horarioInicio?: Date;
    horaFinal?: Date;
    lembrete?: number; // Notificação do evento
    observacao?: String;
    
}
