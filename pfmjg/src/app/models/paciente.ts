export class Paciente {

    idPaciente: number = 0;
    nomePaciente: String = "";
    sobrenomePaciente: String = "";
    dataNascPac: Date = new Date();
    idade: number = 0;
    cidade: String = "";
    estado: String = "";
    statusPag: String = "";
    tipoConsul: String = "";
    qtdaMesAcom: number = 0; 
    telefone: String = "";
    qtdaPago: number = 0;
    tipoPag: String = "";
    valorConsul: number = 0;


    constructor(idPaciente: number, nomePaciente: String, sobrenomePaciente: String,
        dataNascPac: Date, idade: number, cidade: String, estado: String, statusPag: String,
        tipoConsul: String, qtdaMesAcom: number, telefone: String, qtdaPag: number,
        tipoPag: String, valorConsul: number) {

            this.idPaciente = idPaciente;
            this.nomePaciente =  nomePaciente;
            this.sobrenomePaciente = sobrenomePaciente;
            this.dataNascPac = dataNascPac;
            this.idade = idade;
            this.cidade = cidade;
            this.estado = estado;
            this.statusPag = statusPag;
            this.tipoConsul = tipoConsul;
            this.qtdaMesAcom = qtdaMesAcom;
            this.telefone = telefone;
            this.tipoPag = tipoPag;
            this.valorConsul = valorConsul;
            

    }

}
