import { Time } from "@angular/common";

export interface Agenda {
    id: number;
    dataInicial: Date;
    dataFinal: Date;
    horaDiaInicial: Time;
    horaDiaFinal: Time;
    tempoPadrao: Time;
    situacao: string;
    nutricionistaNome: string;
}