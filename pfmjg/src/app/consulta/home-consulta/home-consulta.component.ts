import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Consulta } from 'src/app/model/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-home-consulta',
  templateUrl: './home-consulta.component.html',
  styleUrls: ['./home-consulta.component.scss']
})
export class HomeConsultaComponent implements OnInit {

  agendado: boolean = true;
  emAndamento: boolean = false;
  finalizada: boolean = false;
  falta: boolean = false;
  cancelada: boolean = false;
  status: string = 'AGENDADO';

  isClick: Boolean = false;
  showFiller = false;
  nome = '';
  nomeP = '';

  filtros = '';
  paciente = '';
  data = '';
  nutricionista = '';

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  consulta$: Observable<Consulta[]> | null = null;
  displayedColumns = ['pacienteNome', 'data', 'horaInicial', 'periodo', 'agendaNutricionista', 'situacao', 'actions'];

  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.consulta$ = this.consultaService.list(this.status,this.filtros)
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

  onCancelar(consulta: Consulta) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja cancelar essa consulta ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultaService.cancelar(consulta.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Consulta cancelada com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar cancelar consulta!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
  }

  onAgendar(consulta: Consulta) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja reagendar essa consulta ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultaService.agendar(consulta.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Consulta reagendada com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar reagendar consulta!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
  }

  onFinalizar(consulta: Consulta) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja finalizar essa consulta ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultaService.finalizar(consulta.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Consulta finalizada com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar finalizar consulta!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
  }

  onAndamento(consulta: Consulta) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja mudar essa consulta para em andamento ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultaService.checkIn(consulta.id).subscribe(
          result => {
            this.refresh();
            this.snackBar.open('Consulta alterada com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => {
            this.snackBar.open('Erro ao tentar alterar consulta!', '', {
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
    const statusSelecionados = [];

    if (this.agendado) {
      statusSelecionados.push('AGENDADO');
    }
    if (this.emAndamento) {
      statusSelecionados.push('EM_ANDAMENTO');
    }
    if (this.finalizada) {
      statusSelecionados.push('FINALIZADA');
    }
    if (this.falta) {
      statusSelecionados.push('FALTA');
    }
    if (this.cancelada) {
      statusSelecionados.push('CANCELADA');
    }

    this.status = statusSelecionados.join(',');

    this.refresh();
  }

  extractUniqueValues(consultas: any[], propriedade: string): string[] {
    const valoresUnicosSet = new Set<string>();

    if (consultas && consultas.length) {
      consultas.forEach(consulta => {
        valoresUnicosSet.add(consulta[propriedade]);
      });
    }

    return Array.from(valoresUnicosSet);
  }

  onDataSelecionada(dataSelecionada: string) {
    if (dataSelecionada === 'None') {
      this.data = '';
    } else {
      this.data = `&data=${dataSelecionada}`;
    }
    if (this.data === '&data=undefined') {
      this.data = '';
    }
    this.atualizarFiltros();
  }

  onNutricionistaSelecionada(nutricionistaSelecionada: string) {
    if (nutricionistaSelecionada === 'None') {
      this.nutricionista = '';
    } else {
      this.nutricionista = `&nutricionista=${nutricionistaSelecionada}`;
    }
    if (this.nutricionista === '&nutricionista=undefined') {
      this.nutricionista = '';
    }
    this.atualizarFiltros();
  }

  onPacienteSelecionado(pacienteSelecionado: string) {
    if (pacienteSelecionado === 'None') {
      this.paciente = '';
    } else {
      this.paciente = `&paciente=${pacienteSelecionado}`;
    }
    if (this.paciente === '&paciente=undefined') {
      this.paciente = '';
    }
    this.atualizarFiltros();
  }

  atualizarFiltros() {
    this.filtros = this.data + this.nutricionista + this.paciente
    this.refresh();
    console.log('filtro = ' + this.filtros)
  }
}
