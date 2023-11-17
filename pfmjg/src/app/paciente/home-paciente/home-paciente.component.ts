import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

  isClick: Boolean = false;

  status: string = '';

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agendar", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
  ];

  pacientes$: Observable<Paciente[]>;
  displayedColumns = ['nome', 'cpf', 'idade', 'cidade', 'estado', 'telefone', 'situacao','actions'];

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pacientes$ = this.pacienteService.list()
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
    this.router.navigate(['cadastrar'], {relativeTo: this.route} )
  }

  onEdit(paciente: Paciente) {
    //this.edit.emit(course);
  }

  onDelete(paciente: Paciente) {
    //this.remove.emit(course);
  }

  direcionarPagina(pagina: string) {
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      this.router.navigate([paginaEncontrada.rota]);
    }
  }

  
  onFilterCheck() {
    // Se o status for 'ativo', 'inativo' ou vazio, envie para o servidor
  //   if (['ativo', 'inativo', ''].includes(this.status)) {
  //     this.pacientes$ = this.pacienteService.list({ status: this.status })
  //         .pipe(
  //             catchError(error => {
  //                 this.onError('Erro ao carregar itens');
  //                 console.log(error);
  //                 return of([]);
  //             })
  //         );
  // } else {
  //     console.log("Status inválido");
  // }

  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }
}
