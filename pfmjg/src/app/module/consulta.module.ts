import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeConsultaComponent } from './pages/consulta/home-consulta/home-consulta.component';
import { CadastrarConsultaComponent } from './pages/consulta/cadastrar-consulta/cadastrar-consulta.component';



@NgModule({
  declarations: [
    HomeConsultaComponent,
    CadastrarConsultaComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
})
export class ConsultaModule { }
