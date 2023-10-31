import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Conta } from 'src/app/models/conta/conta';
import { ControleCaixa } from 'src/app/models/controle-caixa/controle-caixa';
import { Paciente } from 'src/app/models/paciente';
import { ControleCaixaService } from 'src/app/services/controle-caixa.service';
import { CategoriaService } from 'src/app/services/service-categoria.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-editar-controle-caixa',
  templateUrl: './editar-controle-caixa.component.html',
  styleUrls: ['./editar-controle-caixa.component.scss']
})
export class EditarControleCaixaComponent {
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

  selectedControlId: number = 0;

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
    this.rotaAtiva.params.subscribe((params) => {
      const id = +params['id']; // Assuming 'id' is a route parameter in your Angular route

      if (id) {
        this.carregarControleParaEdicao(id);
      }
    });
    this.listarPacientes();
  }

  carregarControleParaEdicao(id: number): void {
    this.controleCaixaService.getIdControle(id).subscribe((controle) => {
      if (controle) {
        console.log(controle)
        this.controleCaixa = controle;
        console.log(this.controleCaixa) // Populate controleCaixa with the existing data
      }
    });
  }


  updControle(form: NgForm) {
    if (form.valid) {
      const id = this.controleCaixa?.idControleCaixa || 0; // Use 0 as a default value if it's undefined
      this.controleCaixaService.editarControleCaixa(id, this.controleCaixa).subscribe(response => {
        this.sucessMessage = "Controle Atualizado!";
        this.exibirMensagem = true;
        console.log(this.controleCaixa);
  
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.rota.navigate(['controles']);
        }, 2000);
      });
    } else {
      console.log("Form is invalid.");
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
