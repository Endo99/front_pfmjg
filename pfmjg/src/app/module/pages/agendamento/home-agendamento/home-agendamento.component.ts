import { Time } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DayPilotCalendarComponent } from '@daypilot/daypilot-lite-angular';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Paciente } from 'src/app/models/paciente';
import { DataService } from 'src/app/services/data.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-home-agendamento',
  templateUrl: './home-agendamento.component.html',
  styleUrls: ['./home-agendamento.component.scss']
})
export class HomeAgendamentoComponent{

  @Input() nomePaciente: String = ''

  @Input() dataConsulta: Date = new Date();

  @Input() horaConsulta: Date = new Date();

  @Input() tipoConsulta: String = '';

  pacientes: Paciente[] = [];
  agendamentos: any[] = [];
  consultas: any[] = [];
  pacientesComDadosRelacionados: any[] = [];

  exibirPopupExclusao = false;
  pacienteSelecionado: Paciente | null = null;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPaciente: any;

  paciente: Paciente = {
    idPaciente: 0,
    cpf: '',
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    estado: '',
    cidade: '',
    telefone: ''
  }

  consulta: Consulta = {
    idConsulta: 0,
    paciente: new Paciente,
    agendamento: 0,
    tipoConsulta: '',
    formaPagamento: '',
  }

  agenda: Agendamento = {
    
    idAgendamento: 0,
    paciente: new Paciente,
    dataInicio: new Date,
    descricao: '',
    horaFinal: new Date,
    horarioInicio: new Date,

  }


  readonly listMenu = [
    { 
      legenda: "Home",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/></svg>',
      alt: "Figura de uma casa"
    },
    {
      legenda: "Desempenho",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/></svg>',
      alt: "Figura de gráfico"
    },
    {
      legenda: "Relatório",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data" viewBox="0 0 16 16"><path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/><path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/><path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"/></svg>',
      alt: "Figura de calendário"
    },
    {
      legenda: "Metas",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16"><path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/><path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>',
      alt: "Figura de uma prancha com três linhas verticais em crescente"
    },
    {
      legenda: "Gastos",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16"><path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/></svg>',
      alt: "Figura de duas moedas"
    },
    {
      legenda: "Pacientes",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16"> <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/></svg>',
      alt: "Figura de um boneco de silhueta de pessoa dentro de um quadrado"
    },
    {
      legenda: "Agendar",
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/></svg>',
      alt: "Figura de calendário"
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private pacienteService: ServicePaciente, private el: ElementRef
    , private dataService: DataService) {
      
     }

     ngOnInit(): void {
    
      this.listarPacientes();
      if (this.pacienteSelecionado) {
        this.renderer.addClass(document.body, 'paciente-selecionado');
      }

      this.dataService.getPacientes().subscribe(data => {
        this.pacientes = data;
      });
  
      this.dataService.getAgendamentos().subscribe(data => {
        this.agendamentos = data;
      });
  
      this.dataService.getConsultas().subscribe(data => {
        this.consultas = data;
      });
      
      this.listarDados();
    }
    
    listarDados() {
      // Consultar dados dos pacientes, agendamentos e consultas aqui
      this.dataService.getPacientes().subscribe((pacientes) => {
        this.pacientes = pacientes;
  
        this.dataService.getAgendamentos().subscribe((agendamentos) => {
          this.agendamentos = agendamentos;
  
          this.dataService.getConsultas().subscribe((consultas) => {
            this.consultas = consultas;
  
            // Associe os dados e atualize pacientesComDadosRelacionados
            this.associaDadosPacientesAgendamentoConsulta();
          });
        });
      });
    }
  
    associaDadosPacientesAgendamentoConsulta() {
      this.pacientesComDadosRelacionados = this.pacientes.map((paciente) => {
        const agendamento = this.agendamentos.find((a) => a.idPaciente === paciente.idPaciente);
        const consulta = this.consultas.find((c) => c.idPaciente === paciente.idPaciente);
  
        return {
          ...paciente,
          ...agendamento,
          ...consulta,
        };
      });
    }

    listarPacientes(): void {
        this.pacienteService.getPaciente().subscribe(data => {
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
    
    voltarPagina(): void {
      this.router.navigate(['pacientes'])
    }
     excluirPaciente() {


      if (this.pacienteSelecionado && this.pacienteSelecionado.idPaciente) {
  
        const idPaciente = this.pacienteSelecionado.idPaciente;
        this.pacienteService.excluirPaciente(idPaciente). subscribe( () => {
          
          
          
          this.sucessMessage = "Paciente Excluído!";
          this.exibirMensagem = true;
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['pacientes']);
          }, 2000)
          this.listarPacientes();
  
          this.pacienteSelecionado = null;
          this.exibirPopupExclusao = false;
        });
      
      }
      else  {
          console.log("Não encontrado ou erro");
      }
    }
  

}
