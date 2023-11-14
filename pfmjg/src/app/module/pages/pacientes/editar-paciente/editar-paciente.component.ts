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

  isClick: Boolean = false;

  exibirMensagem: boolean = false;

  regex = new FormControl();

  cpfValido: boolean = false;

  controleRegex = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)])

  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  pacienteId: number = 0;

  paciente: Paciente = {
    idPaciente: 0,
    nome: '',
    dataNascimento: new Date(),
    cidade: '',
    estado: '',
    telefone: '',
    situacao: '',
  };
  
  constructor(private servicePaciente: ServicePaciente, private rotaAtiva: ActivatedRoute,
    private rota: Router, private el: ElementRef, private toastr: ToastrService) {

  }

  ngOnInit() : void {
    console.log(this.paciente)
    this.rotaAtiva.params.subscribe(params => {
      console.log(+params['id'])
      this.pacienteId = +params['id'];
      console.log('ID do Paciente:', this.pacienteId);
      console.log(this.servicePaciente.getIdPaciente(this.pacienteId))
      if (this.pacienteId) {
        this.carregarDetalhesPaciente();
      }
    })
  }

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendamentos" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas"},
    { nome: "Categoria", rota: "/categorias"},
    { nome: "Paciente", rota: "/pacientes"},
    // Adicione outras páginas conforme necessário
  ];


  direcionarPagina(pagina: string) {
    // Encontre a página correspondente no array de páginas
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      // Redirecione para a rota correspondente
      this.rota.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }
  
  

  atualizarNomePaciente(event: any) {
    this.paciente.nome = (event.target as HTMLInputElement).value;
  }
  

  updPaciente(form: NgForm): void {
    const idPaciente = this.paciente.idPaciente;
    if (this.paciente && this.pacienteForm.valid && idPaciente !== undefined) {
      // Preencha os valores do objeto paciente com os valore
      

      this.paciente.idPaciente = idPaciente;
      this.paciente.nome = this.pacienteForm.value.nomePaciente as string;
      this.paciente.dataNascimento = this.pacienteForm.value.dataNascimentoPaciente as Date;
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
      console.log(this.paciente)
      console.log(this.servicePaciente.getIdPaciente(this.pacienteId))
      this.servicePaciente.getIdPaciente(this.pacienteId).subscribe(
        paciente => {

          console.log('Dados do paciente obtidos:', paciente);
          this.paciente = paciente;

        },
        error => {
          console.log('Erro ao obter os dados do paciente:', error);
        }
      );
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
