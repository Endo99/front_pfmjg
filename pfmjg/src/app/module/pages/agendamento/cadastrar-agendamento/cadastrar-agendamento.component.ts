import { Component, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Consulta } from 'src/app/models/consulta/consulta';
import { PacienteDTO } from 'src/app/models/dto/paciente-dto';
import { Paciente } from 'src/app/models/paciente';
import { ServiceAgendamento } from 'src/app/services/service-agendamento.service';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-cadastrar-agendamento',
  templateUrl: './cadastrar-agendamento.component.html',
  styleUrls: ['./cadastrar-agendamento.component.scss']
})
export class CadastrarAgendamentoComponent {

  @ViewChild('agendaForm') agendaForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPatientId: string = '';
  

  pacientes: Paciente[] = [];

  consulta: Consulta = {

  paciente: new Paciente,

  agendamento: 0,

  dataConsultaAtual: new Date,

  tipoConsulta: '',

  formaPagamento: '',
  
  };

  agenda: Agendamento = {

    idAgendamento: 0,
    dataInicio: new Date,
    descricao: '',
    horaFinal: new Date,
    horarioInicio: new Date,
    paciente: new Paciente,
    
  };
  
  paciente: Paciente = {
    
    nomePaciente: '',
    dataNascimentoPaciente: new Date,
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: '',
    cpf: '',
    agendamento: new Agendamento,

  };

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private serviceConsulta: ServiceConsulta,
    private serviceAgendamento: ServiceAgendamento, private servicePaciente: ServicePaciente) {
      
     }

  addAgenda(form: NgForm): void {
    console.log(this.exibirMensagem)
    console.log(this.paciente.idPaciente)
    console.log("Paciente",this.paciente) 
    console.log("ID Paciente agenda", this.agenda.paciente?.idPaciente)
    console.log("Agenda",this.agenda)
   if (form.valid && this.paciente) {
     console.log(this.agenda);     
      this.serviceAgendamento.cadastrarAgendamento(this.agenda).subscribe((response) => {
        if ( this.agenda.paciente != null) {
          this.sucessMessage = "Agendamento Cadastrado!";
          this.exibirMensagem = true;
          console.log(response);
          console.log(this.agenda);
          console.log(this.exibirMensagem);
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['agendamento']);
          }, 2000)
        } else {  
          console.log("Algum dado faltante ou id não encontrado")
        }
    });
    }
    else {
      console.log("Formulário inválido.");
    }
  }

  ngOnInit(): void {
    this.listarPacientes();
  }
  
  listarPacientes(): void {
    this.servicePaciente.getPaciente().subscribe(data => {
    this.pacientes = data;
    this.sortPacientesByNome();
  })
  }
  
  sortPacientesByNome() {
    this.pacientes = this.pacientes.filter(paciente => paciente.nomePaciente !== undefined);
    this.pacientes.sort((a, b) => {
      const nomeA = a.nomePaciente!.toLowerCase();
      const nomeB = b.nomePaciente!.toLowerCase();
      if (nomeA < nomeB) {
        return -1;
      }
      if (nomeA > nomeB) {
        return 1;
      }
      return 0;
    });
  }
  // readonly listMenu = [
  //   { 
  //     legenda: "Home",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/></svg>',
  //     alt: "Figura de uma casa"
  //   },
  //   {
  //     legenda: "Desempenho",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/></svg>',
  //     alt: "Figura de gráfico"
  //   },
  //   {
  //     legenda: "Relatório",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data" viewBox="0 0 16 16"><path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/><path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/><path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"/></svg>',
  //     alt: "Figura de calendário"
  //   },
  //   {
  //     legenda: "Metas",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16"><path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/><path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>',
  //     alt: "Figura de uma prancha com três linhas verticais em crescente"
  //   },
  //   {
  //     legenda: "Gastos",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16"><path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/></svg>',
  //     alt: "Figura de duas moedas"
  //   },
  //   {
  //     legenda: "Pacientes",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16"> <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/></svg>',
  //     alt: "Figura de um boneco de silhueta de pessoa dentro de um quadrado"
  //   },
  //   {
  //     legenda: "Agendar",
  //     iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/></svg>',
  //     alt: "Figura de calendário"
  //   },
  // ];


  buscarDetalhesDoPaciente(cpf: string): void {
    this.servicePaciente.getPacientePorCPF(cpf).subscribe((paciente) => {
      console.log(cpf)
      console.log(paciente)
      if (paciente) {
        
        this.paciente.idPaciente = paciente.idPaciente as number;
        this.paciente.cpf = paciente.cpf as string;
        this.paciente.nomePaciente = paciente.nomePaciente as string;
        this.paciente.dataNascimentoPaciente = paciente.dataNascimentoPaciente as Date;
        this.paciente.idadePaciente = paciente.idadePaciente as number;
        this.paciente.cidade = paciente.cidade as string;
        this.paciente.estado = paciente.estado as string;
        this.paciente.telefone = paciente.telefone as string;

        console.log(this.paciente.cidade)
        console.log(this.paciente.cpf)
        console.log(this.paciente.dataNascimentoPaciente)
        console.log(this.paciente.estado)
        console.log(this.paciente.idadePaciente)
        console.log(this.paciente.nomePaciente)
        console.log(this.paciente.idPaciente)
        console.log(this.paciente.telefone)
  
        this.selectedPatientId = cpf;
        console.log(this.selectedPatientId)
        
        this.agenda.paciente = paciente; // Você pode atribuir diretamente o objeto paciente à agenda.
        console.log(this.agenda.paciente)
      }
      console.log(this.paciente)
    });
  }
  
  voltarPagina(): void {
    this.router.navigate(['agendamentos'])
  }

}
