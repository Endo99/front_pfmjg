import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriaService } from 'src/app/services/service-categoria.service';

@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.scss']
})
export class HomeCategoriaComponent {

  categorias: Categoria[] = [];

  exibirPopupExclusao = false;

  isClick: Boolean = false;

  categoriaSelecionado: Categoria | null = null;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedCategoria: any;

  categoria: Categoria = {
    idCategoria: 0,
    descricao: '',
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

  ngOnInit(): void {
    
    this.listarCategoria();
  }

  

  listarCategoria(): void {
    this.categoriaService.getCategoria().subscribe(data => {
    this.categorias = data;
    this.sortCategoriaByDescricao();
  })
  }

  sortCategoriaByDescricao() {
    this.categorias = this.categorias.filter(categorias => categorias.descricao !== undefined);
    this.categorias.sort((a, b) => {
    const nomeA = a.descricao!.toLowerCase();
    const nomeB = b.descricao!.toLowerCase();
    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  });
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private categoriaService: CategoriaService) {
      
     }

     excluirCategoria() {


      if (this.categoriaSelecionado && this.categoriaSelecionado.idCategoria) {
  
        const idCategoria = this.categoriaSelecionado.idCategoria;
        this.categoriaService.excluirCategoria(idCategoria). subscribe( () => {
          
          this.sucessMessage = "Categoria Excluído!";
          this.exibirMensagem = true;
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['categorias']);
          }, 2000)
          this.listarCategoria();
  
          this.categoriaSelecionado = null;
          this.exibirPopupExclusao = false;
        });
      
      }
      else  {
          console.log("Não encontrado ou erro");
      }
    }
  
    selecionarPaciente(categoria: Categoria): void {
      this.categoriaSelecionado = categoria;
    }
  
    openPopup(categoria: any) {
      console.log("Clicou");
      console.log(this.categoriaSelecionado = categoria);
      this.categoriaSelecionado = categoria;
    
    }
  
    closePopup() {
      this.categoriaSelecionado = null;
      this.router.navigate(['/categorias']);
    }
}
