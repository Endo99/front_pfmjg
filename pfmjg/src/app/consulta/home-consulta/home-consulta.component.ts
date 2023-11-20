import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Consulta } from 'src/app/model/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-home-consulta',
  templateUrl: './home-consulta.component.html',
  styleUrls: ['./home-consulta.component.scss']
})
export class HomeConsultaComponent implements OnInit {

  isClick: Boolean = false;

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agendar", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  consulta$: Observable<Consulta[]>;
  displayedColumns = ['pacienteNome', 'data', 'horaInicial', 'periodo', 'agendaNutricionista','situacao', 'actions'];

  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.consulta$ = this.consultaService.list()
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

  onEdit(consulta: Consulta) {
    this.router.navigate(['editar', consulta.id], { relativeTo: this.route })
  }

  onDelete(consulta: Consulta) {
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
