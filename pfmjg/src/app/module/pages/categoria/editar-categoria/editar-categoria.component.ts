import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriaService } from 'src/app/services/service-categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent {
  @ViewChild('categoriaForm') categoriaForm!: NgForm;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  cpfValido: boolean = false;


  categoriaId: number = 0;

  categoria: Categoria = {
    idCategoria: 0,
    descricao: '',
    tipoCategoria: '',
  };
  
  constructor(private serviceCategoria: CategoriaService, private rotaAtiva: ActivatedRoute,
    private rota: Router, private el: ElementRef, private toastr: ToastrService) {

  }

  ngOnInit() : void {
    this.rotaAtiva.params.subscribe(params => {
      this.categoriaId = +params['id'];
      console.log('ID do Paciente:', this.categoriaId);
      this.carregarDetalhesPaciente();
    })
  }
  

  updCategoria(form: NgForm): void {
    const idCategoria = this.categoria.idCategoria;
    console.log(form.value)
    // Verifique se o objeto paciente está definido e se o formulário é válido
    if (this.categoria && this.categoriaForm.valid && idCategoria !== undefined) {
      // Preencha os valores do objeto paciente com os valores do formulário

      this.categoria.descricao = this.categoriaForm.value.descricao as string;
      this.categoria.tipoCategoria = this.categoriaForm.value.tipoCategoria as string;
  
      this.serviceCategoria.atualizarCategoria(idCategoria, this.categoria).subscribe(() => {
        this.sucessMessage = "Categoria Atualizada!";
        this.exibirMensagem = true;
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.rota.navigate(['categorias']);
        }, 2000)

      });
      
    } else {
      console.log('Categoria não definido ou formulário inválido');
    }
  }
  
  
    carregarDetalhesPaciente() {
      this.serviceCategoria.getIdCategoria(this.categoriaId).subscribe(
        categoria => {
          this.categoria = categoria;

        },
        error => {
          console.log('Erro ao obter os dados da categoria:', error);
        }
      );
  }

  voltarPagina(): void {
    this.rota.navigate(['categorias'])
  }

@HostListener('input')
onInput() {
  const input = this.el.nativeElement;
  if (input.value < 0) {
    input.value = '';
  }
}
}
