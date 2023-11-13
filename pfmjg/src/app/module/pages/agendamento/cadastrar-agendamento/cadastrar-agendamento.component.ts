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

  isClick: Boolean = false;
  
  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPatientId: string = '';
  

  pacientes: Paciente[] = [];

  consulta: Consulta = {

  paciente: new Paciente,

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
    
  };
  
  paciente: Paciente = {
    
    nome: '',
    dataNascimento: new Date,
    cidade: '',
    estado: '',
    telefone: '',
    cpf: '',
    situacao: ''

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
            this.router.navigate(['agendamentos']);
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

  buscarDetalhesDoPaciente(cpf: string): void {
    console.log(this.selectedPatientId)
    console.log(cpf)
    this.servicePaciente.getPacientePorCPF(cpf).subscribe((paciente) => {
      console.log(cpf)
      console.log(paciente)
      if (paciente) {
        
        this.paciente.idPaciente = paciente.idPaciente as number;
        this.paciente.cpf = paciente.cpf as string;
        this.paciente.nome = paciente.nomePaciente as string;
        this.paciente.dataNascimento = paciente.dataNascimentoPaciente as Date;
        this.paciente.cidade = paciente.cidade as string;
        this.paciente.estado = paciente.estado as string;
        this.paciente.telefone = paciente.telefone as string;
  
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
