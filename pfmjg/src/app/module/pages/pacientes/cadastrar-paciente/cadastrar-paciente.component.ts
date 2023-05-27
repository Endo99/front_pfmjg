import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

  paciente: Paciente = {
    nomePaciente: '',
    sobrenomePaciente: '',
    dataNascPac: new Date(),
    idadePac: 0,
    cidadePac: '',
    estadoPac: '',
    statusPag: '',
    tipoConsul: '',
    qtdaMesAcom: 0, 
    telefone: '',
    qtdaPago: 0,
    tipoPag: '',
    valorConsul: 0,
  };

  ngOnInit() : void {
  }
  
  
  constructor(private servicePaciente: ServicePaciente, private rota: Router) {
    this.paciente = new Paciente();

  }

  addPaciente(): void {this.servicePaciente.cadastrarPaciente(this.paciente).subscribe(response => 
    {
      console.log(response);
      console.log(this.paciente);
    })
    this.rota.navigate(['/home-paciente'])
  }

  // atualizarCidade(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const escolhido = selectElement.value;
  //   this.paciente.cidadePac = escolhido;
  // }

  // atualizarEstado(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const escolhido = selectElement.value;
  //   this.paciente.estadoPac = escolhido;
  // }

  // atualizarTipoConsul(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const escolhido = selectElement.value;
  //   this.paciente.tipoConsul = escolhido;
  // }

  // atualizarStatus(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const escolhido = selectElement.value;
  //   this.paciente.statusPag = escolhido;
  // }

  // atualizarTipoPagamento(valor: string): void {
  //   if (valor) {
  //     this.paciente.tipoPag = valor;
  // }
  // }

  // atualizarQtdMes(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const escolhido = selectElement.value;
  //   this.paciente.qtdaMesAcom = parseInt(escolhido);
  // }

  atualizarNomePaciente(event: Event) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }
}
