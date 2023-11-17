import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendaService } from 'src/app/services/agenda.service';
import { Nutricionista } from 'src/app/model/nutricionista';
import { NutricionistaService } from 'src/app/services/nutricionista.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.scss']
})
export class FormAgendaComponent implements OnInit {

  form: FormGroup;

  nutricionistas: Nutricionista[] = [];
  private nutricionistaSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: AgendaService,
    private nutricionistaService: NutricionistaService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.buscarNutricionista();

    this.form = this.formBuilder.group({
      dataInicial: [null],
      dataFinal: [null],
      horaDiaInicial: [null],
      horaDiaFinal: [null],
      tempoPadrao: [null],
      nutricionistaId: [null]

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formData = this.form.value;
    const dataInicial = this.formatDate(formData.dataInicial);
    const dataFinal = this.formatDate(formData.dataFinal);
    formData.dataInicial = dataInicial;
    formData.dataFinal = dataFinal;

    this.service.save(this.form.value).subscribe(
      result => {
        this.success();
      },
      error => {
        if (Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error[0].message;
          this.error(errorMessage);
        } else {
          this.error(error.error.message);
        }
      }
    );
  }

  buscarNutricionista() {
    this.nutricionistaSubscription = this.nutricionistaService.list()
      .subscribe(
        (nutricionista: Nutricionista[]) => {
          this.nutricionistas = nutricionista;
        },
        (error: any) => {
          this.error('Erro ao carregar nutricionistas');
          console.log(error);
        }
      );
  }

  onCancel() {
    this.location.back();
  }

  private success() {
    this.snackBar.open("Salvo com Sucesso", '', { duration: 5000 });
    this.onCancel();
  }

  private error(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private formatDate = (date: Date): string => {
    if (!date) return '';
    return date.toISOString().slice(0, 10);
  };
}
