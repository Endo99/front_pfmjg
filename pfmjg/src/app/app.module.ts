import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ServicePaciente } from './services/service-paciente.service';
<<<<<<< HEAD
import { PacientesModule } from './module/pacientes.module';
=======
>>>>>>> parent of 69a39f9 (Puxando os dados!)


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ServicePaciente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
