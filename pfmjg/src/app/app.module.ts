import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendamentoModule } from './module/agendamento.module';
import { CategoriaModule } from './module/categoria.module';
import { ConsultaModule } from './module/consulta.module';
import { NutricionistaModule } from './module/nutricionista.module';
import { PacientesModule } from './module/pacientes.module';
import { ServicePaciente } from './services/service-paciente.service';
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
    NutricionistaModule,
  ],
  providers: [
    ServicePaciente,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
