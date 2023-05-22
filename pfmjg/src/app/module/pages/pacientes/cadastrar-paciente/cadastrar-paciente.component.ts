import { Component, EventEmitter, Output } from '@angular/core';
import { Paciente } from '../../../../models/paciente';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent {

  @Output() addPaciente: EventEmitter<Paciente> = new EventEmitter<Paciente>();

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: "",
    sobrenomePaciente: "",
    dataNascPac: new Date(),
    idade: 0,
    cidade: "",
    estado: "",
    statusPag: "",
    tipoConsul: "",
    qtdaMesAcom: 0,
    telefone: "",
    qtdaPago: 0,
    tipoPag: "",
    valorConsul: 0

  }

  onSubmit() {
    if (this.paciente != null) {
      this.addPaciente.emit(this.paciente);
    }
    console.log(this.paciente.nomePaciente);
  }

  

}
