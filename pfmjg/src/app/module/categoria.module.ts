import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeCategoriaComponent } from './pages/categoria/home-categoria/home-categoria.component';
import { CadastrarCategoriaComponent } from './pages/categoria/cadastrar-categoria/cadastrar-categoria.component';
import { EditarCategoriaComponent } from './pages/categoria/editar-categoria/editar-categoria.component';



@NgModule({
  declarations: [
    HomeCategoriaComponent,
    CadastrarCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ]
})
export class CategoriaModule { }
