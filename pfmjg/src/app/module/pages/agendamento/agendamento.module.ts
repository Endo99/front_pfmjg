import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoComponent } from './agendamento.component';
import { CadastrarAgendamentoComponent } from './cadastrar-agendamento/cadastrar-agendamento.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DayPilotModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
  
    CadastrarAgendamentoComponent
  ],
  exports: [],
  providers: []
})
export class AgendamentoModule { }
