import { Time } from "@angular/common";

export interface Agenda {
    id: number;
    dataInicial: Date;
    dataFinal: Date;
    horaDiaInicial: Time | null;
    horaDiaFinal: Time | null;
    tempoPadrao: Time | null;
    situacao: string;
    nutricionistaNome: string;
}