import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  cidades: any[] = [];
  abreviacoes: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

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

  constructor(private servicePaciente: ServicePaciente, private rota: Router) {
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
    } else {
      Object.keys(form.controls).forEach(controlName => {
        const control = form.controls[controlName];
        this.camposPreenchidos[controlName] = control.value !== '' || (control.touched && control.invalid);
      });
    }
  }
  
}

