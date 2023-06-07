import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
=======
>>>>>>> parent of 69a39f9 (Puxando os dados!)

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

<<<<<<< HEAD
  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  cidades: any[] = [];
  abreviacoes: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  estadoSelecionado: string = '';

=======
>>>>>>> parent of 69a39f9 (Puxando os dados!)
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
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 69a39f9 (Puxando os dados!)

  gerarIdade(date: Date) {
    dateNow: new Date();
    dateInput: this.paciente.dataNascimentoPaciente;

    age: date

<<<<<<< HEAD
  }
=======
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
>>>>>>> parent of 69a39f9 (Puxando os dados!)

  atualizarNomePaciente(event: Event) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }
<<<<<<< HEAD

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
  
=======
>>>>>>> parent of 69a39f9 (Puxando os dados!)
}
