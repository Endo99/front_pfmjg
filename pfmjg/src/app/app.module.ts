import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicePaciente } from './services/service-paciente.service';
import { PacientesModule } from './module/pacientes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PacientesModule
  ],
  providers: [
    ServicePaciente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
