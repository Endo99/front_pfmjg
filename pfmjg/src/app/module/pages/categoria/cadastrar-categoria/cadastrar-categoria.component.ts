import { Component, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriaService } from 'src/app/services/service-categoria.service';

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.scss']
})
export class CadastrarCategoriaComponent {

  @ViewChild('categoriaForm') pacienteForm!: NgForm;

  isClick: Boolean = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  categoria : Categoria = {
    descricao: '',
  };

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

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService, private serviceCategoria: CategoriaService) {
      
     }

     addCategoria(form: NgForm): void {
      console.log(this.exibirMensagem)
      console.log(this.categoria.idCategoria)
     if (form.valid) {
        this.serviceCategoria.cadastrarCategoria(this.categoria).subscribe(response =>     
      {
        this.sucessMessage = "Categoria Cadastrado!";
        this.exibirMensagem = true;
        console.log(response);
        console.log(this.categoria);
        console.log(this.exibirMensagem);
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.router.navigate(['categorias']);
        }, 2000)
      });
      }
      else {
        console.log()
      }
    }

    voltarPagina(): void {
      this.router.navigate(['categorias'])
    }
}
