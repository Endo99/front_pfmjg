import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicePaciente } from './services/service-paciente.service';
import { PacientesModule } from './module/pacientes.module';
import { AgendamentoModule } from './module/agendamento.module';
import { ConsultaModule } from './module/consulta.module';
import { CategoriaModule } from './module/categoria.module';
import { DatePipe } from '@angular/common';
import { ControleCaixa } from './models/controle-caixa/controle-caixa';
import { ControleCaixaModule } from './module/controle-caixa.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PacientesModule,
    AgendamentoModule,
    ConsultaModule,
    CategoriaModule,
    ControleCaixaModule,
  ],
  providers: [
    ServicePaciente,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
