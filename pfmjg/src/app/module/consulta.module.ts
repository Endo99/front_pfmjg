import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeConsultaComponent } from './pages/consulta/home-consulta/home-consulta.component';
import { CadastrarConsultaComponent } from './pages/consulta/cadastrar-consulta/cadastrar-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarConsultaComponent } from './pages/consulta/editar-consulta/editar-consulta.component';



@NgModule({
  declarations: [
    HomeConsultaComponent,
    CadastrarConsultaComponent,
    EditarConsultaComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
})
export class ConsultaModule { }
