import { ControleCaixa } from "../controle-caixa/controle-caixa";

export class Conta {
    idConta?: number;
    controleCaixa?: ControleCaixa[] = [];
    saldoAtual?: number;
}