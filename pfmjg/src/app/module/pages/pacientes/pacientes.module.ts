import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CadastrarPacienteComponent,
    EditarPacienteComponent,
    HomePacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PacientesModule { }
