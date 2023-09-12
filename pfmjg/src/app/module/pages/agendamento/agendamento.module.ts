import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeAgendamentoComponent } from './home-agendamento/home-agendamento.component';
import { CadastrarAgendamentoComponent } from './cadastrar-agendamento/cadastrar-agendamento.component';
import { HomePacienteComponent } from '../pacientes/home-paciente/home-paciente.component';
import { CadastrarPacienteComponent } from '../pacientes/cadastrar-paciente/cadastrar-paciente.component';
import { EditarPacienteComponent } from '../pacientes/editar-paciente/editar-paciente.component';
import { DetalhesPacienteComponent } from '../pacientes/detalhes-paciente/detalhes-paciente.component';



@NgModule({
  declarations: [
    HomeAgendamentoComponent,
    CadastrarAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DayPilotModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
  ]

})
export class AgendamentoModule { }
