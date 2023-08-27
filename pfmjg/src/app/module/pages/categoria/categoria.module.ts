import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategoriaComponent } from './home-categoria/home-categoria.component';
import { CadastrarCategoriaComponent } from './cadastrar-categoria/cadastrar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';



@NgModule({
  declarations: [
    HomeCategoriaComponent,
    CadastrarCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriaModule { }
