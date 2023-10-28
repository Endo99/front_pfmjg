import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAgendamentoComponent } from './pages/agendamento/home-agendamento/home-agendamento.component';
import { CadastrarAgendamentoComponent } from './pages/agendamento/cadastrar-agendamento/cadastrar-agendamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditarAgendamentoComponent } from './pages/agendamento/editar-agendamento/editar-agendamento.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    DayPilotModule
  ],
  declarations: [
    HomeAgendamentoComponent,
    CadastrarAgendamentoComponent,
    EditarAgendamentoComponent
  ],
  
})
export class AgendamentoModule { }
