import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarPacienteComponent } from './pages/pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from './pages/pacientes/editar-paciente/editar-paciente.component';
import { HomePacienteComponent } from './pages/pacientes/home-paciente/home-paciente.component';
import { DetalhesPacienteComponent } from './pages/pacientes/detalhes-paciente/detalhes-paciente.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { HomeConsultaComponent } from './pages/consulta/home-consulta/home-consulta.component';
import { HomeAgendamentoComponent } from './pages/agendamento/home-agendamento/home-agendamento.component';


@NgModule({
  declarations: [
    HomeComponent,
    CadastrarPacienteComponent,
    EditarPacienteComponent,
    HomePacienteComponent,
    DetalhesPacienteComponent,
    ConsultaComponent,
    AgendamentoComponent,
    HomeConsultaComponent,
    HomeAgendamentoComponent
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
export class PacientesModule { }
