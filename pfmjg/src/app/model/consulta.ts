import { Time } from "@angular/common";

export interface Consulta {
    id: number;
    data: Date;
    dataFinal: Date;
    horaInicial: Time;
    horaFinal: Time;
    periodo: Time;
    situacao: string;
    pacienteNome: string;
    agendaNutricionista: string;
}