import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Nutricionista } from 'src/app/models/nutricionista/nutricionista';
import { Paciente } from 'src/app/models/paciente';
import { NutricionistaService } from 'src/app/services/nutricionista.service';
import { CategoriaService } from 'src/app/services/service-categoria.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-cadastrar-controle-caixa',
  templateUrl: './cadastrar-nutricionista.component.html',
  styleUrls: ['./cadastrar-nutricionista.component.scss']
})
export class CadastrarNutricionista {

  @ViewChild('controleForm') controleForm!: NgForm;

  selectedCat: string = '';

  isClick: Boolean = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  pacienteInativo = true;

  agendamentos: Agendamento[] = [];

  formasDePagamento: string[] = ["Dinheiro", "Cartão de Crédito", "Cartão de Débito", "PIX"];

  categorias: Categoria[] = [];

  consulatId: number = 0;

  selectedProdutoOuCliente: string = '';

  selectedAgendamentoId: number = 0;

  selectedPatientId: string = '';

  tiposDeConsulta: string[] = ['Presencial', 'Online'];

  nutricionista: Nutricionista = {
    
    id: 0,
    nome: '',
    cpf: '',
    telefone: '',
    situacao: '',
    categoria: new Categoria(),
    descricao: ''
    
  };

  categoria: Categoria = {

    idCategoria: 0,
    descricao: '',

  }

  paciente: Paciente = {
    idPaciente: undefined,
    cpf: '',
    nome: '',
    dataNascimento: new Date(),
    cidade: '',
    estado: '',
    telefone: '',
    situacao: '',
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
    private nutricionistaService: NutricionistaService, private categoriaService: CategoriaService ) {

  }

  ngOnInit(): void {
    this.rotaAtiva.params.subscribe(params => {
      this.consulatId = +params['id'];
    })
    this.listarCategorias()
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
      this.rota.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

  addControle(form: NgForm) {
    if (form.valid) {
          this.nutricionistaService.cadastrarNutricionistaAConta(this.nutricionista).subscribe(response => {
            this.sucessMessage = "Controle Cadastrado!";
            this.exibirMensagem = true;
            console.log(this.nutricionista)
            // this.Nutricionista.conta = [];
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

  listarCategorias() {
    this.categoriaService.getCategoria().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  buscarDetalhesDoPaciente(cpf: string): void {
    console.log(this.pacienteService.getPacientePorCPF(cpf));
    this.pacienteService.getPacientePorCPF(cpf).subscribe((paciente) => {
      if (paciente) {
        this.paciente.idPaciente = paciente.idPaciente;
        this.paciente.cpf = paciente.cpf;
        this.paciente.nome = paciente.nomePaciente;
        this.paciente.dataNascimento = paciente.dataNascimentoPaciente;
        this.paciente.cidade = paciente.cidade;
        this.paciente.estado = paciente.estado;
        this.paciente.telefone = paciente.telefone;
        this.nutricionista.categoria = this.categoria;

        console.log(this.nutricionista)

        this.selectedPatientId = cpf;
      }
    });
  }

  voltarPagina(): void {
    this.rota.navigate(['controles'])
  }

}