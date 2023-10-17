import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss']
})
export class EditarPacienteComponent {

  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  regex = new FormControl();

  cpfValido: boolean = false;

  controleRegex = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)])

  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  pacienteId: number = 0;

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: '',
  };
  
  constructor(private servicePaciente: ServicePaciente, private rotaAtiva: ActivatedRoute,
    private rota: Router, private el: ElementRef, private toastr: ToastrService) {

  }

  ngOnInit() : void {
    this.rotaAtiva.params.subscribe(params => {
      this.pacienteId = +params['id'];
      console.log('ID do Paciente:', this.pacienteId);
      this.carregarDetalhesPaciente();
    })
  }
  
  

  atualizarNomePaciente(event: any) {
    this.paciente.nomePaciente = (event.target as HTMLInputElement).value;
  }
  

  updPaciente(form: NgForm): void {
    const idPaciente = this.paciente.idPaciente;
    console.log(form.value)
    console.log("Valores recebidos:")
    console.log('ID do Paciente:', idPaciente);
    console.log('Nome do Paciente:', this.paciente.nomePaciente);
    console.log('Data de nascimento do Paciente:', this.paciente.dataNascimentoPaciente);
    console.log('Idade do Paciente:', this.paciente.idadePaciente);
    console.log('CPF do Paciente:', this.paciente.cpf);
    console.log('Cidade do Paciente:', this.paciente.cidade);
    console.log('Estado do Paciente:', this.paciente.estado);
    console.log('Telefone do Paciente:', this.paciente.telefone);
    console.log('Valores do Formulário:', this.pacienteForm.value);
    console.log(this.pacienteForm.valid);
    // Verifique se o objeto paciente está definido e se o formulário é válido
    if (this.paciente && this.pacienteForm.valid && idPaciente !== undefined) {
      // Preencha os valores do objeto paciente com os valores do formulário
      console.log("Entrou");
      
      console.log(this.paciente.nomePaciente = this.pacienteForm.value.nomePaciente)
      console.log(this.paciente.dataNascimentoPaciente = this.pacienteForm.value.dataNascimentoPaciente)
      console.log(this.paciente.idadePaciente = this.pacienteForm.value.idadePaciente)
      console.log(this.paciente.cpf = this.pacienteForm.value.cpf)
      console.log(this.paciente.cidade = this.pacienteForm.value.cidade)
      console.log(this.paciente.estado = this.pacienteForm.value.estado)
      console.log(this.paciente.telefone = this.pacienteForm.value.telefone)
      
      

      this.paciente.idPaciente = idPaciente;
      this.paciente.nomePaciente = this.pacienteForm.value.nomePaciente as string;
      this.paciente.dataNascimentoPaciente = this.pacienteForm.value.dataNascimentoPaciente as Date;
      this.paciente.idadePaciente = this.pacienteForm.value.idadePaciente as number;
      this.paciente.cpf = this.pacienteForm.value.cpf as string;
      this.paciente.cidade = this.pacienteForm.value.cidade as string;
      this.paciente.estado = this.pacienteForm.value.estado as string;
      this.paciente.telefone = this.pacienteForm.value.telefone as string;
  
      this.servicePaciente.atualizarPaciente(idPaciente, this.paciente).subscribe(() => {
        this.sucessMessage = "Paciente Salvo!";
        this.exibirMensagem = true;
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.rota.navigate(['pacientes']);
        }, 2000)

      });
      
    } else {
      console.log('Paciente não definido ou formulário inválido');
    }
  }
  
  
    carregarDetalhesPaciente() {
      this.servicePaciente.getIdPaciente(this.pacienteId).subscribe(
        paciente => {
          console.log('Dados do paciente obtidos:', paciente);
          this.paciente = paciente;
          
          console.log('Valores do paciente após atribuição:');
          console.log('ID do Paciente:', this.paciente.idPaciente);
          console.log('Nome do Paciente:', this.paciente.nomePaciente);
          console.log('Data de nascimento do Paciente:', this.paciente.dataNascimentoPaciente);
          console.log('Idade do Paciente:', this.paciente.idadePaciente);
          console.log('Cidade do Paciente:', this.paciente.cidade);
          console.log('Estado do Paciente:', this.paciente.estado);

        },
        error => {
          console.log('Erro ao obter os dados do paciente:', error);
        }
      );
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

formatarTelefone(): void {
  if (this.paciente.telefone) {
    const telefone = this.paciente.telefone;
    const telefoneNumerico = telefone.replace(/\D/g, '');
    if (telefoneNumerico.length === 11) {
      this.paciente.telefone = `(${telefoneNumerico.substring(0, 2)}) ${telefoneNumerico.substring(2, 7)}-${telefoneNumerico.substring(7)}`;
    }
  }
}

voltarPagina(): void {
  this.rota.navigate(['pacientes'])
}

@HostListener('input')
onInput() {
  const input = this.el.nativeElement;
  if (input.value < 0) {
    input.value = '';
  }
}

}
