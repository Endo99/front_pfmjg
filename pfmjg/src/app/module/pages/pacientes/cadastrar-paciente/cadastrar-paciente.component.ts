import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  sucessMessage: string = "Paciente Cadastrado!";

  regex = new FormControl();

  controleRegex = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)])

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

  constructor(private servicePaciente: ServicePaciente, private rota: Router, private el: ElementRef) {
  }

  addPaciente(form: NgForm): void {

   if (form.valid) {
        this.servicePaciente.cadastrarPaciente(this.paciente).subscribe(response =>     
        {
          console.log(response);
          console.log(this.paciente);
          this.rota.navigate(['paciente'])
      });
    }
  }

  calcularIdade() {
    if (this.paciente.dataNascimentoPaciente) {
      const hoje = new Date();
      const dataNascimento = new Date(this.paciente.dataNascimentoPaciente);
      const diff = Math.abs(hoje.getTime() - dataNascimento.getTime());
      this.paciente.idadePaciente = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Calcula a idade em anos considerando anos bissextos
    }
  }

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

  formatarTelefone(): void {
    if (this.paciente.telefone) {
      const telefone = this.paciente.telefone;
      const telefoneNumerico = telefone.replace(/\D/g, '');
      if (telefoneNumerico.length === 11) {
        this.paciente.telefone = `(${telefoneNumerico.substring(0, 2)}) ${telefoneNumerico.substring(2, 7)}-${telefoneNumerico.substring(7)}`;
      }
    }
  }

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    if (input.value < 0) {
      input.value = '';
    }
  }
  
}
