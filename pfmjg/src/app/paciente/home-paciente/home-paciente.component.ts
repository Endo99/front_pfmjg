import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

  isClick: Boolean = false;

  ativo: boolean = true;
  inativo: boolean = false;
  status: string = 'ATIVO';

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  pacientes$: Observable<Paciente[]> | null = null;
  displayedColumns = ['nome', 'cpf', 'idade', 'cidade', 'estado', 'telefone', 'situacao', 'actions'];

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    console.log('status = ' + this.status);
    this.pacientes$ = this.pacienteService.list(this.status)
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

  onEdit(paciente: Paciente) {
    this.router.navigate(['editar', paciente.id], { relativeTo: this.route })
  }

  onDelete(paciente: Paciente) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem que deseja excluir esse item ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.pacienteService.remove(paciente.id).subscribe(
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

  onReativar(paciente: Paciente) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja reativar esse item ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.pacienteService.ativar(paciente.id).subscribe(
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
