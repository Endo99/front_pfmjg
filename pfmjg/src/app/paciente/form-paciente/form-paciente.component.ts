import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss']
})
export class FormPacienteComponent implements OnInit {

  isClick: Boolean = false;

  form: FormGroup;

  abreviacoes: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    private formBuilder: FormBuilder,
    private service: PacienteService,
    private snackBar: MatSnackBar,
    private location: Location,
    private rota: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      cpf: [null],
      nome: [null],
      dataNascimento: [null],
      cidade: [null],
      estado: [null],
      telefone: [null]

    });
  }

  ngOnInit(): void {
    const paciente: Paciente = this.route.snapshot.data['paciente'];
    console.log('formato q vem do back');
    console.log(paciente.dataNascimento);

    let dataNascimento = this.formatDateToISO(paciente.dataNascimento);
    this.form.setValue({
      id: paciente.id,
      cpf: paciente.cpf,
      nome: paciente.nome,
      dataNascimento: dataNascimento, //this.formatDateToISO(paciente.dataNascimento),
      cidade: paciente.cidade,
      estado: paciente.estado,
      telefone: paciente.telefone
    })
  }

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
    // Adicione outras páginas conforme necessário
  ];


  direcionarPagina(pagina: string) {
    // Encontre a página correspondente no array de páginas
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      // Redirecione para a rota correspondente
      this.rota.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

  onSubmit() {
    const formData = this.form.value;
    console.log("formato front");
    console.log(formData.dataNascimento);
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
    this.rota.navigate(['/pacientes'])
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

  private formatDateToISO = (date: Date): Date | null => {
    const dateString = date.toString();
    if (!dateString) return null;

    const [day, month, year] = dateString.split('/').map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const isoDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`;

    if (isoDateString) {
      return new Date(isoDateString);
    }

    return null;
  };
}
