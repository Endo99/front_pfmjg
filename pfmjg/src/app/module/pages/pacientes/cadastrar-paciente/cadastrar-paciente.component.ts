import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GeonamesService } from 'src/app/services/geonames.service';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  cidades: any[] = [];
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
  }

  constructor(private servicePaciente: ServicePaciente, private rota: Router, private geonamesService: GeonamesService) {
    this.paciente = new Paciente();
  }

  addPaciente(): void {

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

      this.servicePaciente.cadastrarPaciente(this.paciente).subscribe(response => 
    
      {
          
        console.log(response);
        console.log(this.paciente);
        this.rota.navigate(['/paciente'])
    
      });


  }

  gerarIdade(date: Date) {
    dateNow: new Date();
    dateInput: this.paciente.dataNascimentoPaciente;

    age: date

  }

  atualizarNomePaciente(event: any) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }

  atualizarsobrenomePaciente(event: any) {
    this.paciente.sobrenomePaciente = event.target.value;
  }

  camposPreenchidos: { [key: string]: boolean} = {};
  
  salvar(form: NgForm): void {
    if (form.valid) {
      // Implemente a lógica para salvar os dados do formulário
    } else {
      // Marcar os campos que estão vazios ou inválidos como preenchidos
      Object.keys(form.controls).forEach(controlName => {
        const control = form.controls[controlName];
        this.camposPreenchidos[controlName] = control.value !== '' || (control.touched && control.invalid);
      });
    }
  }

  atualizarEstado(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const escolhido = selectElement.value;
    this.paciente.estado = escolhido;
  }
  
}

