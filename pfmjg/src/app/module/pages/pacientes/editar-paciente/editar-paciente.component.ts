import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { GeonamesService } from 'src/app/services/geonames.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss']
})
export class EditarPacienteComponent {

  estados: string[] = ['Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins'];

  estadoSelecionado: string = '';

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  pacienteId: number = 0;

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
    this.rotaAtiva.params.subscribe(params => {
      this.pacienteId = +params['id'];
      this.carregarDetalhesPaciente();
    })
  }
  
  
  constructor(private servicePaciente: ServicePaciente, private rotaAtiva: ActivatedRoute,
    private rota: Router,) {

  }

  atualizarNomePaciente(event: any) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }
  
  atualizarsobrenomePaciente(event: any) {
    this.paciente.sobrenomePaciente = event.target.value;
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
    
    const id = Number(this.rotaAtiva.snapshot.paramMap.get('id'));
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

  atualizarPaciente(): void {
    if (this.pacienteForm.valid) {

      this.paciente.nomePaciente = this.pacienteForm.value.nomePaciente;
      this.paciente.sobrenomePaciente = this.pacienteForm.value.sobrenomePaciente;
      this.paciente.dataNascimentoPaciente = this.pacienteForm.value.dataNascimentoPaciente;
      this.paciente.idadePaciente = this.pacienteForm.value.idadePaciente;
      this.paciente.cidade = this.pacienteForm.value.cidade;
      this.paciente.estado = this.pacienteForm.value.estado;
      this.paciente.statusPagamento = this.pacienteForm.value.statusPagamento;
      this.paciente.tipoConsulta = this.pacienteForm.value.tipoConsulta;
      this.paciente.mesesAcompanhado = this.pacienteForm.value.mesesAcompanhado;
      this.paciente.telefone = this.pacienteForm.value.telefone;
      this.paciente.quantiaPaga = this.pacienteForm.value.quantiaPaga;
      this.paciente.formaPagamento = this.pacienteForm.value.formaPagamento;
      this.paciente.valorConsulta = this.pacienteForm.value.valorConsulta;
  
      if (this.paciente.idPaciente) {
        this.servicePaciente.atualizarPaciente(this.paciente.idPaciente, this.paciente).subscribe(() => {
          this.rota.navigate(['/pacientes']);
        });
      }
    }
  }
    carregarDetalhesPaciente() {
      this.servicePaciente.getPacienteById(this.pacienteId).subscribe(
        paciente => {
          this.paciente = paciente;
      // Preencha os campos de edição com os valores do paciente
        },
        error => {
      // Lida com o erro de carregamento dos detalhes do paciente
        }
  );
}

}
