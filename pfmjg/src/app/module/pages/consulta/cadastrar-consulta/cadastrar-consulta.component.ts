import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Paciente } from 'src/app/models/paciente';
import { CategoriaService } from 'src/app/services/service-categoria.service';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';


@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.scss']
})
export class CadastrarConsultaComponent {

  @ViewChild('consultaForm') consultaForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  formasDePagamento: string[] = ["Dinheiro", "Cartão de Crédito", "Cartão de Débito", "PIX"];

  pacientes: Paciente[] = [];

  consulatId: number = 0;

  selectedPatientId: string = '';

  tiposDeConsulta: string[] = ['Presencial', 'Online'];

  consulta: Consulta = {
    idConsulta: 0,
    paciente: new Paciente,
    agendamento: 0,
    dataConsultaAtual: new Date(),
    tipoConsulta: '',
    formaPagamento: '',
  };

  paciente: Paciente = {
    idPaciente: 0,
    cpf: '',
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: ''
  };
  constructor(private serviceConsulta: ServiceConsulta, private rotaAtiva: ActivatedRoute,
    private rota: Router, private el: ElementRef, private toastr: ToastrService, private pacienteService: ServicePaciente) {

  }

  ngOnInit() : void {
    this.rotaAtiva.params.subscribe(params => {
      this.consulatId = +params['id'];
    })
    this.listarPacientes();
  }
  

  listarPacientes() {
    this.pacienteService.getPaciente().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  addConsulta(form: NgForm): void {
    console.log(this.exibirMensagem)
    console.log(this.consulta.idConsulta)
   if (form.valid) {
      this.serviceConsulta.cadastrarConsulta(this.consulta).subscribe(response =>     
    {
      this.sucessMessage = "Consulta Cadastrado!";
      this.exibirMensagem = true;
      console.log(response);
      console.log(this.consulta);
      console.log(this.exibirMensagem);
      setTimeout(() => {
        this.toastr.success(this.sucessMessage, 'Sucesso');
        this.rota.navigate(['consultas']);
      }, 2000)
    });
    }
    else {
      console.log()
    }
  }

  buscarDetalhesDoPaciente(cpf: string): void {
    console.log(this.pacienteService.getPacientePorCPF(cpf));
    this.pacienteService.getPacientePorCPF(cpf).subscribe((paciente) => {
      if (paciente) {
        this.paciente.idPaciente = paciente.idPaciente;
        this.paciente.cpf = paciente.cpf;
        this.paciente.nomePaciente = paciente.nomePaciente;
        this.paciente.dataNascimentoPaciente = paciente.dataNascimentoPaciente;
        this.paciente.idadePaciente = paciente.idadePaciente;
        this.paciente.cidade = paciente.cidade;
        this.paciente.estado = paciente.estado;
        this.paciente.telefone = paciente.telefone;
  
        this.selectedPatientId = cpf;
        this.consulta.paciente = paciente; // Você pode atribuir diretamente o objeto paciente à agenda.
      }
    });
  }

  voltarPagina(): void {
    this.rota.navigate(['consultas'])
  }

@HostListener('input')
onInput() {
  const input = this.el.nativeElement;
  if (input.value < 0) {
    input.value = '';
  }
}
}

