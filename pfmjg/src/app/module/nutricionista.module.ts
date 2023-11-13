import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { CadastrarNutricionista } from './pages/nutricionista/cadastrar-nutricionista/cadastrar-nutricionista.component';
import { HomeNutricionistaComponent } from './pages/nutricionista/home-nutricionista/home-nutricionista.component';
import { EditarNutrucionistaComponent } from './pages/nutricionista/editar-nutricionista/editar-nutricionista.component';



@NgModule({
  declarations: [
    HomeNutricionistaComponent,
    CadastrarNutricionista,
    EditarNutrucionistaComponent
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
export class NutricionistaModule { }
