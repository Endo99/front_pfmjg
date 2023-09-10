import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components

import { HomePacienteComponent } from './module/pages/pacientes/home-paciente/home-paciente.component';
import { HomeComponent } from './module/pages/home/home.component';
import { CadastrarPacienteComponent } from './module/pages/pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './module/pages/pacientes/editar-paciente/editar-paciente.component';
import { DetalhesPacienteComponent } from './module/pages/pacientes/detalhes-paciente/detalhes-paciente.component';
import { HomeCategoriaComponent } from './module/pages/categoria/home-categoria/home-categoria.component';
import { CadastrarCategoriaComponent } from './module/pages/categoria/cadastrar-categoria/cadastrar-categoria.component';
import { HomeConsultaComponent } from './module/pages/consulta/home-consulta/home-consulta.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "pacientes", component: HomePacienteComponent},
  {path: "pacientes/cadastrar", component: CadastrarPacienteComponent},
  {path: 'pacientes/editar/:id', component: EditarPacienteComponent},
  {path: "pacientes/detalhes/:id", component: DetalhesPacienteComponent},
  {path: "consulta/home", component: HomeConsultaComponent},
  // { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
