import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeControleCaixaComponent } from './pages/controle-caixa/home-controle-caixa/home-controle-caixa.component';
import { CadastrarControleCaixaComponent } from './pages/controle-caixa/cadastrar-controle-caixa/cadastrar-controle-caixa.component';
import { EditarControleCaixaComponent } from './pages/controle-caixa/editar-controle-caixa/editar-controle-caixa.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    HomeControleCaixaComponent,
    CadastrarControleCaixaComponent,
    EditarControleCaixaComponent
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
  ]
})
export class ControleCaixaModule { }
