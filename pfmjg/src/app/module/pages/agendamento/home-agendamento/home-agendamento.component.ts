import { DatePipe, Time } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DayPilotCalendarComponent } from '@daypilot/daypilot-lite-angular';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Consulta } from 'src/app/models/consulta/consulta';
import { DadosRelationadosDTO } from 'src/app/models/dadosRelacionados/dados-relationados-dto';
import { Paciente } from 'src/app/models/paciente';
import { DadosRelacionadosService } from 'src/app/services/dados-relacionados.service';
import { DataService } from 'src/app/services/data.service';
import { ServiceAgendamento } from 'src/app/services/service-agendamento.service';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-home-agendamento',
  templateUrl: './home-agendamento.component.html',
  styleUrls: ['./home-agendamento.component.scss']
})
export class HomeAgendamentoComponent {

  @Input() nomePaciente: String = ''

  @Input() dataConsulta: Date = new Date();

  @Input() horaConsulta: Date = new Date();

  @Input() tipoConsulta: String = '';

  isClick: Boolean = false;

  pacientes: Paciente[] = [];
  agendamentos: Agendamento[] = [];
  consultas: Consulta[] = [];
  dadosRelacionados: DadosRelationadosDTO[] = [];

  pacientesComDadosRelacionados: any[] = [];

  exibirPopupExclusao = false;
  pacienteSelecionado: Paciente | null = null;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPaciente: any;

  dataConsultaFormatada: string | null = null;
  horaConsultaFormatada: string | null = null;

  paciente: Paciente = {
    cpf: '',
    nome: '',
    dataNascimento: new Date(),
    estado: '',
    cidade: '',
    telefone: '',
    situacao: ''
  }

  consulta: Consulta = {
    idConsulta: 0,
    paciente: new Paciente,
    agendamento: new Agendamento,
    tipoConsulta: '',
    formaPagamento: '',
  }

  agenda: Agendamento = {

    idAgendamento: 0,
    paciente: new Paciente,
    dataInicio: new Date,
    descricao: '',
    horaFinal: '',
    horarioInicio: '',

  }

  dadoRelacionado: DadosRelationadosDTO = {
    nomePaciente: '',
    tipoConsulta: '',
    dataConsulta: new Date(),
    horaAgendamento: ''
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private pacienteService: ServicePaciente, private el: ElementRef
    , private dataService: DataService, private datePipe: DatePipe, private dadosRelacionadosService: DadosRelacionadosService,
    private agendamentoService: ServiceAgendamento, private consultaService: ServiceConsulta) {
    this.dataConsultaFormatada = this.formatDataConsulta(this.dataConsulta);
    this.horaConsultaFormatada = this.formatHoraConsulta(this.horaConsulta);
  }

  ngOnInit(): void {


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
      this.router.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

  private formatDataConsulta(dataConsulta: Date): string | null {
    if (dataConsulta) {
      return this.datePipe.transform(dataConsulta, 'dd/MM/yyyy') || null;
    }
    return null;
  }

  private formatHoraConsulta(horaConsulta: Date): string | null {
    if (horaConsulta) {
      return this.datePipe.transform(horaConsulta, 'HH:mm') || null;
    }
    return null;
  }

  voltarPagina(): void {
    this.router.navigate(['pacientes'])
  }

  excluirAgenda() {


    if (this.pacienteSelecionado && this.pacienteSelecionado.idPaciente) {

      const idAgenda = this.pacienteSelecionado.idPaciente;
      this.agendamentoService.excluirAgendamento(idAgenda).subscribe(() => {

        this.sucessMessage = "Agenda Excluído!";
        this.exibirMensagem = true;
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.router.navigate(['agendamentos']);
        }, 2000)

        this.pacienteSelecionado = null;
        this.exibirPopupExclusao = false;
      });

    }
    else {
      console.log("Não encontrado ou erro");
    }
  }

}
