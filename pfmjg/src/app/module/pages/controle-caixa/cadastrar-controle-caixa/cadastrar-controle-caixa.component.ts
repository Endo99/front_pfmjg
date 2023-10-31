import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Conta } from 'src/app/models/conta/conta';
import { ControleCaixa } from 'src/app/models/controle-caixa/controle-caixa';
import { Paciente } from 'src/app/models/paciente';
import { ContaService } from 'src/app/services/conta.service';
import { ControleCaixaService } from 'src/app/services/controle-caixa.service';
import { ServiceAgendamento } from 'src/app/services/service-agendamento.service';
import { CategoriaService } from 'src/app/services/service-categoria.service';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-cadastrar-controle-caixa',
  templateUrl: './cadastrar-controle-caixa.component.html',
  styleUrls: ['./cadastrar-controle-caixa.component.scss']
})
export class CadastrarControleCaixaComponent {

  @ViewChild('controleForm') controleForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  pacienteInativo = true;

  agendamentos: Agendamento[] = [];

  formasDePagamento: string[] = ["Dinheiro", "Cartão de Crédito", "Cartão de Débito", "PIX"];

  pacientes: Paciente[] = [];

  contas: Conta[] = [];

  categorias: Categoria[] = [];

  consulatId: number = 0;

  selectedProdutoOuCliente: string = '';

  selectedAgendamentoId: number = 0;

  selectedPatientId: string = '';

  tiposDeConsulta: string[] = ['Presencial', 'Online'];

  controleCaixa: ControleCaixa = {
    
    paciente: new Paciente,
    conta: [],
    data: new Date,
    produtoOuCliente: '',
    preco: 0,
    formaPagamento: '',
    descricaoControle: '',
    
  };

  categoria: Categoria = {

    idCategoria: 0,
    descricao: '',
    tipoCategoria: '',
    controle: new ControleCaixa

  }

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
    horaFinal: '',
    observacao: '',
  }

  constructor(private rotaAtiva: ActivatedRoute, private rota: Router,
    private toastr: ToastrService, private pacienteService: ServicePaciente,
    private controleCaixaService: ControleCaixaService, private categoriaService: CategoriaService ) {

  }

  ngOnInit(): void {
    this.rotaAtiva.params.subscribe(params => {
      this.consulatId = +params['id'];
    })
    this.listarPacientes();
    this.listarCategorias()
  }

  addControle(form: NgForm) {
    if (form.valid) {
          this.controleCaixaService.cadastrarControleCaixaAConta(this.controleCaixa).subscribe(response => {
            this.sucessMessage = "Controle Cadastrado!";
            this.exibirMensagem = true;
            console.log(this.controleCaixa)
            // this.controleCaixa.conta = [];
            setTimeout(() => {
              this.toastr.success(this.sucessMessage, 'Sucesso');
              this.rota.navigate(['controles']);
            }, 2000)
          });
        }
        else {
          console.log()
        }
  }

  listarPacientes() {
    this.pacienteService.getPaciente().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  listarCategorias() {
    this.categoriaService.getCategoria().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  onChangeTipo(produtoOuCliente: string) {
    if (produtoOuCliente === 'Produto') {
      this.pacienteInativo = true;
      this.controleCaixa.produtoOuCliente = produtoOuCliente
    } else {
      this.pacienteInativo = false;
      this.controleCaixa.produtoOuCliente = produtoOuCliente
    }
  }
  // addConsulta(form: NgForm): void {
  //   console.log(this.exibirMensagem)
  //   console.log(this.consulta.idConsulta)
  //   console.log(this.consulta)
  //   if (form.valid) {
  //     this.serviceConsulta.cadastrarConsulta(this.consulta).subscribe(response => {
  //       this.sucessMessage = "Consulta Cadastrado!";
  //       this.exibirMensagem = true;
  //       console.log(response);
  //       console.log(this.consulta);
  //       console.log(this.exibirMensagem);
  //       setTimeout(() => {
  //         this.toastr.success(this.sucessMessage, 'Sucesso');
  //         this.rota.navigate(['consultas']);
  //       }, 2000)
  //     });
  //   }
  //   else {
  //     console.log()
  //   }
  // }

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
        this.controleCaixa.paciente = paciente;

        console.log(this.controleCaixa)

        this.selectedPatientId = cpf;
      }
    });
  }

  voltarPagina(): void {
    this.rota.navigate(['controles'])
  }

}
