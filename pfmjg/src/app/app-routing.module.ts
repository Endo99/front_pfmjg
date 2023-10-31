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
import { HomeAgendamentoComponent } from './module/pages/agendamento/home-agendamento/home-agendamento.component';
import { CadastrarAgendamentoComponent } from './module/pages/agendamento/cadastrar-agendamento/cadastrar-agendamento.component';
import { EditarCategoriaComponent } from './module/pages/categoria/editar-categoria/editar-categoria.component';
import { CadastrarConsultaComponent } from './module/pages/consulta/cadastrar-consulta/cadastrar-consulta.component';
import { EditarAgendamentoComponent } from './module/pages/agendamento/editar-agendamento/editar-agendamento.component';
import { CadastrarControleCaixaComponent } from './module/pages/controle-caixa/cadastrar-controle-caixa/cadastrar-controle-caixa.component';
import { EditarControleCaixaComponent } from './module/pages/controle-caixa/editar-controle-caixa/editar-controle-caixa.component';
import { HomeControleCaixaComponent } from './module/pages/controle-caixa/home-controle-caixa/home-controle-caixa.component';



const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "pacientes", component: HomePacienteComponent},
  {path: "pacientes/cadastrar", component: CadastrarPacienteComponent},
  {path: 'pacientes/editar/:id', component: EditarPacienteComponent},
  {path: "pacientes/detalhes/:id", component: DetalhesPacienteComponent},
  {path: "categorias", component: HomeCategoriaComponent},
  {path: "categorias/cadastrar", component: CadastrarCategoriaComponent},
  {path: "categorias/editar/:id", component: EditarCategoriaComponent},
  {path: "consultas", component: HomeConsultaComponent},
  {path: "consultas/editar/:id", component: CadastrarAgendamentoComponent},
  {path: "consultas/cadastrar", component: CadastrarConsultaComponent},
  {path: "agendamentos", component: HomeAgendamentoComponent},
  {path: "agendamentos/cadastrar", component: CadastrarAgendamentoComponent},
  {path: "agendamentos/editar/:id", component: EditarAgendamentoComponent},
  {path: "controles/cadastrar", component: CadastrarControleCaixaComponent},
  {path: "controles/editar/:id", component: EditarControleCaixaComponent},
  {path: "controles", component: HomeControleCaixaComponent},
  // { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
