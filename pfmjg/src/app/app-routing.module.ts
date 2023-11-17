import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePacienteComponent } from './paciente/home-paciente/home-paciente.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormPacienteComponent } from './paciente/form-paciente/form-paciente.component';
import { HomeNutricionistaComponent } from './nutricionista/home-nutricionista/home-nutricionista.component';
import { FormNutricionistaComponent } from './nutricionista/form-nutricionista/form-nutricionista.component';
import { HomeAgendaComponent } from './agenda/home-agenda/home-agenda.component';
import { FormAgendaComponent } from './agenda/form-agenda/form-agenda.component';
import { HomeCategoriaComponent } from './categoria/home-categoria/home-categoria.component';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { HomeConsultaComponent } from './consulta/home-consulta/home-consulta.component';
import { FormConsultaComponent } from './consulta/form-consulta/form-consulta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pacientes', component: HomePacienteComponent },
  { path: 'pacientes/cadastrar', component: FormPacienteComponent },
  { path: 'nutricionistas', component: HomeNutricionistaComponent },
  { path: 'nutricionistas/cadastrar', component: FormNutricionistaComponent },
  { path: 'agendas', component: HomeAgendaComponent },
  { path: 'agendas/cadastrar', component: FormAgendaComponent },
  { path: 'categorias', component: HomeCategoriaComponent },
  { path: 'categorias/novo', component: FormCategoriaComponent },
  { path: 'consultas', component: HomeConsultaComponent },
  { path: 'consultas/cadastrar', component: FormConsultaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
