import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendaService } from 'src/app/services/agenda.service';
import { Nutricionista } from 'src/app/model/nutricionista';
import { NutricionistaService } from 'src/app/services/nutricionista.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Agenda } from 'src/app/model/agenda';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.scss']
})
export class FormAgendaComponent implements OnInit {

  isClick: Boolean = false;

  form: FormGroup;

  nutricionistas: Nutricionista[] = [];
  private nutricionistaSubscription: Subscription | undefined;

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendas" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas"},
    { nome: "Categoria", rota: "/categorias"},
    { nome: "Paciente", rota: "/pacientes"},
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

  constructor(
    private formBuilder: FormBuilder,
    private service: AgendaService,
    private nutricionistaService: NutricionistaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private rota: Router,
    private route: ActivatedRoute,
    private dateFormat: DatePipe
  ) {
    this.buscarNutricionista();

    this.form = this.formBuilder.group({
      id: [null],
      dataInicial: [null],
      dataFinal: [null],
      horaDiaInicial: [null],
      horaDiaFinal: [null],
      tempoPadrao: [null],
      nutricionistaId: [null]

    });
  }

  ngOnInit(): void {
    const agenda: Agenda = this.route.snapshot.data['agenda'];
    this.form.setValue({
      id: agenda.id,
      dataInicial: this.formatDateToISO(agenda.dataInicial),
      dataFinal: this.formatDateToISO(agenda.dataFinal),
      horaDiaInicial:agenda.horaDiaInicial,
      horaDiaFinal: agenda.horaDiaFinal,
      tempoPadrao: agenda.tempoPadrao,
      nutricionistaId: 3
    })
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
    this.nutricionistaSubscription = this.nutricionistaService.list('ATIVO')
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
    this.rota.navigate(['/agendas'])
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
