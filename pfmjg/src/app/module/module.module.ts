import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component'
import { CadastrarPacienteComponent } from './pages/pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './pages/pacientes/editar-paciente/editar-paciente.component';
import { ExcluirPacienteComponent } from './pages/pacientes/excluir-paciente/excluir-paciente.component';
import { HomePacienteComponent } from './pages/pacientes/home-paciente/home-paciente.component';



@NgModule({
  declarations: [
    HomeComponent,
    CadastrarPacienteComponent,
    EditarPacienteComponent,
    ExcluirPacienteComponent,
    HomePacienteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModuleModule { }
