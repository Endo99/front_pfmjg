import { Component, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Paciente } from 'src/app/models/paciente';
import { ServiceAgendamento } from 'src/app/services/service-agendamento.service';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-editar-agendamento',
  templateUrl: './editar-agendamento.component.html',
  styleUrls: ['./editar-agendamento.component.scss']
})
export class EditarAgendamentoComponent {

  @ViewChild('agendaForm') agendaForm!: NgForm;

  isClick: Boolean = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPatientId: string | undefined;

  agendaId: number = 0;
  
  pacientes: Paciente[] = [];

  consulta: Consulta = {

  paciente: new Paciente,

  agendamento: new Agendamento,

  dataConsultaAtual: new Date,

  tipoConsulta: '',

  formaPagamento: '',
  
  };

  agenda: Agendamento = {

    idAgendamento: 0,
    dataInicio: new Date,
    descricao: '',
    horaFinal: '',
    horarioInicio: '',
    paciente: new Paciente,
    observacao: ''
    
  };
  
  paciente: Paciente = {
    
    nome: '',
    dataNascimento: new Date,
    cidade: '',
    estado: '',
    telefone: '',
    cpf: '',
    situacao: '',

  };

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private serviceConsulta: ServiceConsulta,
    private serviceAgendamento: ServiceAgendamento, private servicePaciente: ServicePaciente) {
      
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

     updAgd(form: NgForm): void {
      const idAgenda = this.agenda.idAgendamento;
      console.log(form.value)
      console.log("Valores recebidos:");
      console.log('Valores do Formulário:', this.agendaForm.value);
      console.log(this.agendaForm.valid);
      // Verifique se o objeto paciente está definido e se o formulário é válido
      if (this.agenda && this.agendaForm.valid && idAgenda !== undefined) {
        // Preencha os valores do objeto paciente com os valores do formulário
        console.log("Entrou");
        
        console.log(this.agenda.descricao = this.agendaForm.value.descricao)
        console.log(this.agenda.dataInicio = this.agendaForm.value.dataInicio)
        console.log(this.agenda.horarioInicio = this.agendaForm.value.horarioInicio)
        console.log(this.agenda.horaFinal = this.agendaForm.value.horaFinal)
        console.log(this.agenda.observacao = this.agendaForm.value.observacao)
        console.log(this.agenda.paciente = this.agendaForm.value.paciente)
        
        
  
        this.agenda.idAgendamento = this.agendaForm.value.idAgedamento;
        this.agenda.descricao = this.agendaForm.value.descricao;
        this.agenda.dataInicio = this.agendaForm.value.dataInicio;
        this.agenda.horarioInicio = this.agendaForm.value.horarioInicio;
        this.agenda.horaFinal = this.agendaForm.value.horaFinal;
        this.agenda.observacao = this.agendaForm.value.observacao;
        this.agenda.paciente = this.agendaForm.value.paciente;
        this.agenda.observacao = this.agendaForm.value.observacao;
        
    
        this.serviceAgendamento.atualizarAgendamento(idAgenda, this.agenda).subscribe(() => {
          this.sucessMessage = "Agenda Salvo!";
          this.exibirMensagem = true;
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['agendamentos']);
          }, 2000)
  
        });
        
      } else {
        console.log('Agendamento não definido ou formulário inválido');
      }
    }

    ngOnInit() : void {
      this.route.params.subscribe(params => {
        const idAgendamento = params['id'];
        console.log('ID do Paciente:', idAgendamento);
        if (idAgendamento) {
          this.carregarAgendamentoParaEdicao(idAgendamento);
        }
      });
      this.listarPacientes();
    }

    carregarAgendamentoParaEdicao(idAgendamento: number): void {
      this.serviceAgendamento.getIdAgendamento(idAgendamento).subscribe((agendamento) => {
        if (agendamento) {
          this.agenda = agendamento;
          this.selectedPatientId = agendamento.paciente?.cpf || '';
        }
      });
    }
  
  listarPacientes(): void {
    this.servicePaciente.getPaciente().subscribe(data => {
    this.pacientes = data;
    this.sortPacientesByNome();
  })
  }
  
  sortPacientesByNome() {
    this.pacientes = this.pacientes.filter(paciente => paciente.nome !== undefined);
    this.pacientes.sort((a, b) => {
      const nomeA = a.nome!.toLowerCase();
      const nomeB = b.nome!.toLowerCase();
      if (nomeA < nomeB) {
        return -1;
      }
      if (nomeA > nomeB) {
        return 1;
      }
      return 0;
    });
  }

  buscarDetalhesDoPaciente(cpf: string | undefined): void {
    if (cpf) {
      this.servicePaciente.getPacientePorCPF(cpf).subscribe((paciente) => {
        console.log(cpf)
        console.log(paciente)
        if (paciente) {
          
          this.paciente.idPaciente = paciente.idPaciente;
          this.paciente.cpf = paciente.cpf;
          this.paciente.nome = paciente.nomePaciente;
          this.paciente.dataNascimento = paciente.dataNascimentoPaciente;
          this.paciente.cidade = paciente.cidade;
          this.paciente.estado = paciente.estado;
          this.paciente.telefone = paciente.telefone;
    
          this.selectedPatientId = cpf;
          console.log(this.selectedPatientId)
          
          this.agenda.paciente = paciente; // Você pode atribuir diretamente o objeto paciente à agenda.
          console.log(this.agenda.paciente)
        }
        console.log(this.paciente)
      });
    }
  }
  
  voltarPagina(): void {
    this.router.navigate(['agendamentos'])
  }


}
