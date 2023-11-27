import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Agenda } from 'src/app/model/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-home-agenda',
  templateUrl: './home-agenda.component.html',
  styleUrls: ['./home-agenda.component.scss']
})
export class HomeAgendaComponent implements OnInit {

  ativo: boolean = true;
  inativo: boolean = false;
  status: string = 'ATIVO';
  isClick: Boolean = false;

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agendar", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  agenda$: Observable<Agenda[]> | null = null;
  displayedColumns = ['nutricionistaNome',
    'dataInicial',
    'dataFinal',
    'horaDiaInicial',
    'horaDiaFinal',
    'tempoPadrao',
    'situacao',
    'actions'];

  constructor(
    private agendaService: AgendaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.agenda$ = this.agendaService.list(this.status)
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

  onDelete(agenda: Agenda) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem que deseja excluir esse item ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.agendaService.remove(agenda.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Item removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar remover item!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
  }

  onReativar(agenda: Agenda) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja reativar esse item ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.agendaService.ativar(agenda.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Item reativado com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar reativar item!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
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

  updateSituacao() {
    if (this.ativo && this.inativo) {
      this.status = 'ATIVO,INATIVO';
    } else if (this.ativo) {
      this.status = 'ATIVO';
    } else if (this.inativo) {
      this.status = 'INATIVO';
    } else {
      this.status = '';
    }
    this.refresh();
  }

}
