import { Time } from "@angular/common";

export interface Consulta {
    id: number;
    data: Date;
    dataFinal: Date;
    horaInicial: Time | null;
    horaFinal: Time | null;
    periodo: Time | null;
    situacao: string;
    pacienteNome: string;
    agendaNutricionista: string;
}