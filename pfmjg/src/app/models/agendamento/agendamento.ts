export class Agendamento {

    idAgendamento?: number;
    idPaciente?: number;
    idConsulta?: number;
    dataInicio?: Date;
    descricao?: String; // nome do evento
    quantidadeConsulta?: number;
    horarioInicio?: Date;
    horaFinal?: Date;
    lembrete?: Date; // Notificação do evento
    observacao?: String;
    
}
