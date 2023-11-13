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
  selector: 'app-editar-controle-caixa',
  templateUrl: './editar-nutricionista.component.html',
  styleUrls: ['./editar-nutricionista.component.scss']
})
export class EditarNutrucionistaComponent {
  @ViewChild('controleForm') controleForm!: NgForm;

  isClick: Boolean = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  pacienteInativo = true;

  agendamentos: Agendamento[] = [];

  categorias: Categoria[] = [];

  consulatId: number = 0;

  selectedProdutoOuCliente: string = '';

  selectedAgendamentoId: number = 0;

  selectedPatientId: string = '';

  selectedControlId: number = 0;

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
    this.rotaAtiva.params.subscribe((params) => {
      const id = +params['id']; // Assuming 'id' is a route parameter in your Angular route

      if (id) {
        this.carregarNutricionistaParaEdicao(id);
      }
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
      this.rota.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

  carregarNutricionistaParaEdicao(id: number): void {
    this.nutricionistaService.getById(id).subscribe((nutricionista) => {
      if (nutricionista) {
        console.log(nutricionista)
        this.nutricionista = nutricionista;
        console.log(this.nutricionista) // Populate nutricionista with the existing data
      }
    });
  }


  updControle(form: NgForm) {
    if (form.valid) {
      const id = this.nutricionista?.id || 0; // Use 0 as a default value if it's undefined
      this.nutricionistaService.editarNutricionista(id, this.nutricionista).subscribe(response => {
        this.sucessMessage = "Controle Atualizado!";
        this.exibirMensagem = true;
        console.log(this.nutricionista);
  
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.rota.navigate(['controles']);
        }, 2000);
      });
    } else {
      console.log("Form is invalid.");
    }
  }

  listarCategorias() {
    this.categoriaService.getCategoria().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  voltarPagina(): void {
    this.rota.navigate(['controles'])
  }

}
