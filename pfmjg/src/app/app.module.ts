import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormAgendaComponent } from './agenda/form-agenda/form-agenda.component';
import { HomeAgendaComponent } from './agenda/home-agenda/home-agenda.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { HomeCategoriaComponent } from './categoria/home-categoria/home-categoria.component';
import { FormConsultaComponent } from './consulta/form-consulta/form-consulta.component';
import { HomeConsultaComponent } from './consulta/home-consulta/home-consulta.component';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { HomeComponent } from './home/home.component';
import { FormNutricionistaComponent } from './nutricionista/form-nutricionista/form-nutricionista.component';
import { HomeNutricionistaComponent } from './nutricionista/home-nutricionista/home-nutricionista.component';
import { FormPacienteComponent } from './paciente/form-paciente/form-paciente.component';
import { HomePacienteComponent } from './paciente/home-paciente/home-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDatepickerToggle } from '@angular/material/datepicker';
// import { MatDateRangePickerModule } from 'mat-date-range-picker';



@NgModule({
  declarations: [
    AppComponent,
    HomePacienteComponent,
    HomeComponent,
    ErrorDialogComponent,
    FormPacienteComponent,
    FormNutricionistaComponent,
    HomeNutricionistaComponent,
    HomeAgendaComponent,
    HomeConsultaComponent,
    HomeCategoriaComponent,
    FormAgendaComponent,
    FormConsultaComponent,
    FormCategoriaComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
