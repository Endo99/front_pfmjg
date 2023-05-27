import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components

import { HomePacienteComponent } from './module/pages/pacientes/home-paciente/home-paciente.component';
import { HomeComponent } from './module/pages/home/home.component';
import { CadastrarPacienteComponent } from './module/pages/pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './module/pages/pacientes/editar-paciente/editar-paciente.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "pacientes", component: HomePacienteComponent},
  {path: "pacientes/cadastrar", component: CadastrarPacienteComponent},
  {path: "pacientes/editar", component: EditarPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
