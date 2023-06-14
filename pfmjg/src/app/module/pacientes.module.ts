import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarPacienteComponent } from './pages/pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './pages/pacientes/editar-paciente/editar-paciente.component';
import { HomePacienteComponent } from './pages/pacientes/home-paciente/home-paciente.component';
import { DetalhesPacienteComponent } from './pages/pacientes/detalhes-paciente/detalhes-paciente.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    CadastrarPacienteComponent,
    EditarPacienteComponent,
    HomePacienteComponent,
    DetalhesPacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class PacientesModule { }
