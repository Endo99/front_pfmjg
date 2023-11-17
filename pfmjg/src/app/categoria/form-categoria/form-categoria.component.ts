import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      descricao: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      result => {
        this.success();
      },
      error => {
        if (Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error[0].message;
          this.snackBar.open(errorMessage, '', { duration: 5000 });
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
}
