import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
import { Router } from '@angular/router';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit{

  paciente: Paciente = {
    nomePaciente: '',
    cpf: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: '',
  };

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  cpfValido: boolean = false;

  regex = new FormControl();

  controleRegex = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)])

  cidades: any[] = [];
  abreviacoes: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  estadoSelecionado: string = '';

  ngOnInit() : void {
  }

  constructor(private servicePaciente: ServicePaciente, private rota: Router, private el: ElementRef, private toastr: ToastrService) {
    this.paciente.cpf = '';
    }

  addPaciente(form: NgForm): void {
    console.log(this.paciente)
    console.log(form)
    console.log(this.exibirMensagem)
    console.log(this.paciente.idPaciente)
   if (form.valid) {
    this.servicePaciente.cadastrarPaciente(this.paciente).subscribe(response =>     
    {
      console.log("Id gerado com o número: " + this.paciente.idPaciente);
      this.sucessMessage = "Paciente Cadastrado!";
      this.exibirMensagem = true;
      console.log(response);
      console.log(this.paciente);
      console.log(this.exibirMensagem);
      setTimeout(() => {
        this.toastr.success(this.sucessMessage, 'Sucesso');
        this.rota.navigate(['pacientes']);
      }, 2000)
    });
    }
    else {
      console.log()
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

  formatarCPF() {
    if (this.paciente.cpf) {
      // Remove todos os caracteres não numéricos
      this.paciente.cpf = this.paciente.cpf.replace(/\D/g, '');
  
      // Aplica a formatação XXX.XXX.XXX-XX
      if (this.paciente.cpf.length > 3) {
        this.paciente.cpf =
          this.paciente.cpf.substring(0, 3) +
          '.' +
          this.paciente.cpf.substring(3);
      }
      if (this.paciente.cpf.length > 7) {
        this.paciente.cpf =
          this.paciente.cpf.substring(0, 7) +
          '.' +
          this.paciente.cpf.substring(7);
      }
      if (this.paciente.cpf.length > 11) {
        this.paciente.cpf =
          this.paciente.cpf.substring(0, 11) +
          '-' +
          this.paciente.cpf.substring(11);
      }
    }
  }


  validarCPF() {
    if (!this.paciente.cpf) {
      this.cpfValido = false; // Se cpf estiver indefinido, não é válido
      return;
    }
    
    const cpf_vald = this.paciente.cpf?.replace(/\D/g, ''); // Remove caracteres não numéricos
  
    if (cpf_vald.length !== 11 || !this.validarCPFDigitos(cpf_vald)) {
      this.cpfValido = false;
    } else {
      this.cpfValido = true;
    }
  }
  
  validarCPFDigitos(cpf: string): boolean {
      // Remove caracteres não numéricos
      cpf = cpf.replace(/\D/g, '');
    
      // Verifica se o CPF possui 11 dígitos
      if (cpf.length !== 11) {
        return false;
      }
    
      // Calcula o primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      const firstDigit = 11 - (sum % 11);
      const firstDigitMatch = (firstDigit >= 10 ? 0 : firstDigit) === parseInt(cpf.charAt(9));
      if (!firstDigitMatch) {
        return false;
      }
    
      // Calcula o segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      const secondDigit = 11 - (sum % 11);
      const secondDigitMatch = (secondDigit >= 10 ? 0 : secondDigit) === parseInt(cpf.charAt(10));
      if (!secondDigitMatch) {
        return false;
      }
    
      return true; // CPF é válido
    }

  voltarPagina(): void {
    this.rota.navigate(['pacientes'])
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
