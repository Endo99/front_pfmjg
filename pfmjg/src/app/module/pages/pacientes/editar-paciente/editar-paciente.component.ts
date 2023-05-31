import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss']
})
export class EditarPacienteComponent {

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  paciente: Paciente = {
    nomePaciente: '',
    sobrenomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    statusPagamento: '',
    tipoConsulta: '',
    mesesAcompanhado: 0, 
    telefone: '',
    quantiaPaga: 0,
    formaPagamento: '',
    valorConsulta: 0,
  };

  ngOnInit() : void {
    this.updPaciente
  }
  
  
  constructor(private servicePaciente: ServicePaciente, private rotaAtiva: ActivatedRoute, private rota: Router) {

  }

  updPaciente(): void {
    
    console.log('Valor recebido para o campo nomePaciente:', this.paciente.nomePaciente);
    console.log('Valor recebido para o campo sobrenomePaciente:', this.paciente.sobrenomePaciente);
    console.log('Valor recebido para o campo dataPaciente:', this.paciente.dataNascimentoPaciente);
    console.log('Valor recebido para o campo idadePaciente:', this.paciente.idadePaciente);
    console.log('Valor recebido para o campo cidade:', this.paciente.cidade);
    console.log('Valor recebido para o campo estado:', this.paciente.estado);
    console.log('Valor recebido para o campo status:', this.paciente.statusPagamento);
    console.log('Valor recebido para o campo tipoConsulta:', this.paciente.tipoConsulta);
    console.log('Valor recebido para o campo mesesAcompanhado:', this.paciente.mesesAcompanhado);
    console.log('Valor recebido para o campo telefone:', this.paciente.telefone);
    console.log('Valor recebido para o campo quantiaPaga:', this.paciente.quantiaPaga);
    console.log('Valor recebido para o campo formaPagamento:', this.paciente.formaPagamento);
    console.log('Valor recebido para o campo valorConsulta:', this.paciente.valorConsulta);
    
    const id = Number(this.rotaAtiva.snapshot.paramMap.get('idPaciente'));
    this.servicePaciente.getPacienteById(id).subscribe(pac => {
      this.paciente = pac;
    })

    console.log('Valor recebido depois nomePaciente:', this.paciente.nomePaciente);
    console.log('Valor recebido depois sobrenomePaciente:', this.paciente.sobrenomePaciente);
    console.log('Valor recebido depois dataPaciente:', this.paciente.dataNascimentoPaciente);
    console.log('Valor recebido depois idadePaciente:', this.paciente.idadePaciente);
    console.log('Valor recebido depois cidade:', this.paciente.cidade);
    console.log('Valor recebido depois estado:', this.paciente.estado);
    console.log('Valor recebido depois status:', this.paciente.statusPagamento);
    console.log('Valor recebido depois tipoConsulta:', this.paciente.tipoConsulta);
    console.log('Valor recebido depois mesesAcompanhado:', this.paciente.mesesAcompanhado);
    console.log('Valor recebido depois telefone:', this.paciente.telefone);
    console.log('Valor recebido depois quantiaPaga:', this.paciente.quantiaPaga);
    console.log('Valor recebido depois formaPagamento:', this.paciente.formaPagamento);
    console.log('Valor recebido depois valorConsulta:', this.paciente.valorConsulta);

  }

  updtarPaciente() : void {
    if (this.paciente.idadePaciente) {
      this.servicePaciente.atualizarPaciente(this.paciente.idadePaciente, this.paciente).subscribe(() =>
      {
        this.rota.navigate(['/pacientes']);
      });
    } else {
      
      this.servicePaciente.cadastrarPaciente(this.paciente).subscribe(() => {
        this.rota.navigate(['/pacientes'])
      })
    }
  }

  atualizarNomePaciente(event: any) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }
  
  atualizarsobrenomePaciente(event: any) {
    this.paciente.sobrenomePaciente = event.target.value;
  }
}
