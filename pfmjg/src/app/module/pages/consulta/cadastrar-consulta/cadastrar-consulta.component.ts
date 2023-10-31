import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Paciente } from 'src/app/models/paciente';
import { ServiceAgendamento } from 'src/app/services/service-agendamento.service';
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

  agendamentos: Agendamento[] = [];

  formasDePagamento: string[] = ["Dinheiro", "Crédito", "Débito", "PIX"];

  pacientes: Paciente[] = [];

  consulatId: number = 0;

  selectedAgendamentoDesc: string = '';

  selectedPatientId: string = '';

  tiposDeConsulta: string[] = ['Presencial', 'Online'];

  consulta: Consulta = {
    idConsulta: 0,
    paciente: new Paciente,
    agendamento: new Agendamento,
    dataConsultaAtual: new Date(),
    tipoConsulta: '',
    formaPagamento: '',
  };

  paciente: Paciente = {
    idPaciente: undefined,
    cpf: '',
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: ''
  };

  agenda: Agendamento = {
    idAgendamento: 0, // ou 0, se preferir
    paciente: new Paciente,
    dataInicio: new Date(), // ou outra data padrão
    descricao: '', // string vazia
    horarioInicio: '', // ou outra data padrão
    horaFinal: '', // ou outra data padrão
    observacao: '',
  }

  constructor(private serviceConsulta: ServiceConsulta, private rotaAtiva: ActivatedRoute,
    private rota: Router, private el: ElementRef, private toastr: ToastrService, private pacienteService: ServicePaciente,
    private serviceAgendamento: ServiceAgendamento, private serviceAgenda: ServiceAgendamento) {

  }

  ngOnInit(): void {
    this.rotaAtiva.params.subscribe(params => {
      this.consulatId = +params['id'];
    })
    this.listarPacientes();
    this.listarAgendamentos();
  }

  listarPacientes() {
    this.pacienteService.getPaciente().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  listarAgendamentos() {
    this.serviceAgendamento.getAgendamento().subscribe((agenda) => {
      this.agendamentos = agenda;
    });
  }

  buscarDetalhesDoAgendamento(descricao: string): void {
    
    console.log(this.serviceAgendamento.getDetalhesDaAgendaPorDescricao(descricao));
    this.serviceAgendamento.getDetalhesDaAgendaPorDescricao(descricao).subscribe((agenda) => {
      if (agenda) {
        this.agenda.idAgendamento = agenda.idAgenda;
        this.agenda.dataInicio = agenda.dataInicio;
        this.agenda.descricao = agenda.descricao;
        this.agenda.horarioInicio = agenda.horarioInicio;
        this.agenda.horaFinal = agenda.horaFinal;
        this.agenda.observacao = agenda.observacao;
        this.agenda.paciente = agenda.paciente;

        console.log(this.agenda)

        this.selectedPatientId = descricao;
        this.consulta.agendamento = agenda; // Você pode atribuir diretamente o objeto paciente à agenda.
      }
    });
  }

  addConsulta(form: NgForm): void {
    console.log(this.exibirMensagem)
    console.log(this.consulta.idConsulta)
    console.log(this.consulta)
    if (form.valid) {
      this.serviceConsulta.cadastrarConsulta(this.consulta).subscribe(response => {
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
        this.agenda.paciente = paciente

        console.log(this.agenda)

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