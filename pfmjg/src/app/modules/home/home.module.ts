import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CadastrarPacienteComponent } from './pages/paciente/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './pages/paciente/editar-paciente/editar-paciente.component';
import { ExcluirPacienteComponent } from './pages/paciente/excluir-paciente/excluir-paciente.component';

//Icons



@NgModule({
  declarations: [
    HeaderComponent,
    ButtonsComponent,
    PagesComponent,
    HomeComponent,
    PacienteComponent,
    CadastrarPacienteComponent,
    EditarPacienteComponent,
    ExcluirPacienteComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
