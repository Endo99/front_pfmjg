import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly listMenu = [
    { 
      legenda: "Home",
      icon: "bi bi-house-door",
      alt: "Figura de uma casa"
    },
    {
      legenda: "Desempenho",
      icon: "bi bi-graph-up",
      alt: "Figura de gráfico"
    },
    {
      legenda: "Relatório",
      icon: "bi bi-clipboard2-data",
      alt: "Figura de calendário"
    },
    {
      legenda: "Metas",
      icon: "bi bi-heck2-square",
      alt: "Figura de uma prancha com três linhas verticais em crescente"
    },
    {
      legenda: "Gastos",
      icon: "bi bi-currency-exchange",
      alt: "Figura de duas moedas"
    },
    {
      legenda: "Pacientes",
      icon: "bi bi-person-square",
      alt: "Figura de um boneco de silhueta de pessoa dentro de um quadrado"
    },
    {
      legenda: "Agendar",
      icon: "bi bi-calendar-week",
      alt: "Figura de calendário"
    },
  ];

}
