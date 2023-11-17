import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Agenda } from 'src/app/model/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-home-agenda',
  templateUrl: './home-agenda.component.html',
  styleUrls: ['./home-agenda.component.scss']
})
export class HomeAgendaComponent implements OnInit {

  isClick: Boolean = false;

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agendar", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  agenda$: Observable<Agenda[]>;
  displayedColumns = ['nutricionistaNome', 'dataInicial', 'dataFinal', 'horaDiaInicial', 'horaDiaFinal', 'tempoPadrao', 'situacao', 'actions'];

  constructor(
    private agendaService: AgendaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.agenda$ = this.agendaService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar itens');
          console.log(error)
          return of([])
        })
      );
  }

  ngOnInit(): void {
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['cadastrar'], { relativeTo: this.route })
  }

  onEdit(agenda: Agenda) {
    //this.edit.emit(course);
  }

  onDelete(agenda: Agenda) {
    //this.remove.emit(course);
  }

  direcionarPagina(pagina: string) {
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      this.router.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

}
