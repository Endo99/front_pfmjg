import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss']
})
export class FormPacienteComponent implements OnInit {

  form: FormGroup;

  abreviacoes: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    private formBuilder: FormBuilder,
    private service: PacienteService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      cpf: [null],
      nome: [null],
      dataNascimento: [null],
      cidade: [null],
      estado: [null],
      telefone: [null]

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formData = this.form.value;
    const dataNascimento = this.formatDate(formData.dataNascimento);
    formData.dataNascimento = dataNascimento;
    formData.cpf = formData.cpf ? formData.cpf.replace(/\D/g, '') : null;
    formData.telefone = formData.telefone ? formData.telefone.replace(/\D/g, '') : null;

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
