import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutricionistaService } from 'src/app/services/nutricionista.service';
import { Observable, Subscription, of } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/model/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutricionista } from 'src/app/model/nutricionista';

@Component({
  selector: 'app-form-nutricionista',
  templateUrl: './form-nutricionista.component.html',
  styleUrls: ['./form-nutricionista.component.scss']
})
export class FormNutricionistaComponent {

  isClick: Boolean = false;

  form: FormGroup;
  categoriaCtrl = new FormControl();
  categorias: Categoria[] = [];
  private categoriasSubscription: Subscription | undefined;

  separatorKeysCodes: number[] = [13, 188];
  filteredCategorias: Observable<any[]>;
  categoriasSelecionadas: any[] = [];

  @ViewChild('categoriaInput') categoriaInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private service: NutricionistaService,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private rota: Router,
    private route: ActivatedRoute
  ) {
    this.buscarCategorias();

    this.form = this.formBuilder.group({
      id: [null],
      cpf: [null],
      nome: [null],
      descricao: [null],
      categoriasIds: [null],
      telefone: [null]
    });

    this.filteredCategorias = this.categoriaCtrl.valueChanges.pipe(
      startWith(null),
      map((categoria: string | null) =>
        categoria ? this._filterCategoria(categoria) : this.categorias.slice()
      )
    );
  }

  ngOnInit(): void {
    const nutricionista: Nutricionista = this.route.snapshot.data['nutricionista'];
    console.log("po9pular camposs")
    console.log(nutricionista)
    console.log("po9pular camposs")
    this.form.setValue({
      id: nutricionista.id,
      cpf: nutricionista.cpf,
      nome: nutricionista.nome,
      descricao: nutricionista.descricao,
      categoriasIds: nutricionista.categoriasIds,
      telefone: nutricionista.telefone
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
    const formData = this.form.value;
    formData.cpf = formData.cpf ? formData.cpf.replace(/\D/g, '') : null;
    formData.telefone = formData.telefone ? formData.telefone.replace(/\D/g, '') : null;

    formData.categoriasIds = this.categoriasSelecionadas.map(categoria => categoria.id);

    this.service.save(formData).subscribe(
      result => {
        this.success();
      },
      error => {
        if (Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error[0].message;
          this.error(errorMessage);
        } else {
          this.error(error.error.message);
        }
      }
    );
  }

  buscarCategorias() {
    this.categoriasSubscription = this.categoriaService.list()
      .subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias;
        },
        (error: any) => {
          this.error('Erro ao carregar categorias');
          console.log(error);
        }
      );
  }

  onCancel() {
    this.rota.navigate(['/nutricionistas'])
  }

  private success() {
    this.snackBar.open('Salvo com Sucesso', '', { duration: 5000 });
    this.onCancel();
  }

  private error(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private _filterCategoria(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.categorias.filter(categoria =>
      categoria.descricao.toLowerCase().includes(filterValue)
    );
  }

  addCategoria(event: any): void {
    const value = (event.value || '').trim();

    if (value && !this.categoriasSelecionadas.some(categoria => categoria.descricao === value)) {
      const categoriaEncontrada = this.categorias.find(categoria =>
        categoria.descricao.toLowerCase() === value.toLowerCase()
      );

      if (categoriaEncontrada) {
        this.categoriasSelecionadas.push(categoriaEncontrada);
      }
    }

    event.chipInput!.clear();
    this.categoriaCtrl.setValue(null);
  }

  removeCategoria(categoria: any): void {
    const index = this.categoriasSelecionadas.indexOf(categoria);

    if (index >= 0) {
      this.categoriasSelecionadas.splice(index, 1);
    }
  }

  selectedCategoria(event: any): void {
    const categoriaSelecionada = event.option.value;

    if (!this.categoriasSelecionadas.includes(categoriaSelecionada)) {
      this.categoriasSelecionadas.push(categoriaSelecionada);
    }

    this.clearInputAndResetValue();
  }

  private clearInputAndResetValue(): void {
    this.categoriaInput.nativeElement.value = '';
    this.categoriaCtrl.setValue(null);
  }
}
