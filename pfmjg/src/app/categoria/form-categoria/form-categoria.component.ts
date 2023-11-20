import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {

  isClick: Boolean = false;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private rota: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      descricao: [null]
    });
  }

  ngOnInit(): void {
    const categoria: Categoria = this.route.snapshot.data['categoria'];
    this.form.setValue({
      id: categoria.id,
      descricao: categoria.descricao
    })
  }

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
    // Adicione outras páginas conforme necessário
  ];


  direcionarPagina(pagina: string) {
    // Encontre a página correspondente no array de páginas
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      // Redirecione para a rota correspondente
      this.rota.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      result => {
        this.success();
      },
      error => {
        if (Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error[0].message;
          this.snackBar.open(errorMessage, '', { duration: 5000 });
        } else {
          this.error(error.error.message);
        }
      }
    );
  }

  onCancel() {
    this.rota.navigate(['/categorias'])
  }

  private success() {
    this.snackBar.open("Salvo com Sucesso", '', { duration: 5000 });
    this.onCancel();
  }

  private error(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }
}
