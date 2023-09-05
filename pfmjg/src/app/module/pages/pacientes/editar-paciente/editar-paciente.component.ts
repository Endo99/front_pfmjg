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

  controleRegex = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)])

  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  pacienteId: number = 0;

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: '',
    sobrenomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    statusPagamento: '',
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
  
  atualizarsobrenomePaciente(event: any) {
    this.paciente.sobrenomePaciente = event.target.value;
  }

  updPaciente(form: NgForm): void {
    const idPaciente = this.paciente.idPaciente;
    console.log('ID do Paciente:', idPaciente);
    console.log('Valores do Formulário:', this.pacienteForm.value);
    console.log(this.pacienteForm.valid);
    // Verifique se o objeto paciente está definido e se o formulário é válido
    if (this.paciente && this.pacienteForm.valid && idPaciente !== undefined) {
      // Preencha os valores do objeto paciente com os valores do formulário
      console.log("Entrou");
      
      console.log(this.paciente.nomePaciente = this.pacienteForm.value.nomePaciente)
      console.log(this.paciente.sobrenomePaciente = this.pacienteForm.value.sobrenomePaciente)
      console.log(this.paciente.dataNascimentoPaciente = this.pacienteForm.value.dataNascimentoPaciente)
      console.log(this.paciente.idadePaciente = this.pacienteForm.value.idadePaciente)
      console.log(this.paciente.cidade = this.pacienteForm.value.cidade)
      console.log(this.paciente.estado = this.pacienteForm.value.estado)
      console.log(this.paciente.statusPagamento = this.pacienteForm.value.statusPagamento)
      console.log(this.paciente.telefone = this.pacienteForm.value.telefone)
      
      

      this.paciente.idPaciente = idPaciente;
      this.paciente.nomePaciente = this.pacienteForm.value.nomePaciente as string;
      this.paciente.sobrenomePaciente = this.pacienteForm.value.sobrenomePaciente as string;
      this.paciente.dataNascimentoPaciente = this.pacienteForm.value.dataNascimentoPaciente as Date;
      this.paciente.idadePaciente = this.pacienteForm.value.idadePaciente as number;
      this.paciente.cidade = this.pacienteForm.value.cidade as string;
      this.paciente.estado = this.pacienteForm.value.estado as string;
      this.paciente.statusPagamento = this.pacienteForm.value.statusPagamento as string;
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
          console.log('Sobrenome do Paciente:', this.paciente.sobrenomePaciente);
          console.log('Data de nascimento do Paciente:', this.paciente.dataNascimentoPaciente);
          console.log('Idade do Paciente:', this.paciente.idadePaciente);
          console.log('Cidade do Paciente:', this.paciente.cidade);
          console.log('Estado do Paciente:', this.paciente.estado);
          console.log('Status do Pagamento do Paciente:', this.paciente.statusPagamento);

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
