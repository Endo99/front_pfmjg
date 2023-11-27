import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  isClick: Boolean = false;

  constructor(private router: Router) {

  }

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
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

}
