import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Location, Time } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Paciente } from 'src/app/model/paciente';
import { Agenda } from 'src/app/model/agenda';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/services/paciente.service';
import { AgendaService } from 'src/app/services/agenda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/model/consulta';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.scss']
})
export class FormConsultaComponent implements OnInit {

  isClick: Boolean = false;

  form: FormGroup;

  pacientes: Paciente[] = [];
  private pacientesSubscription: Subscription | undefined;
  agendas: Agenda[] = [];
  private agendasSubscription: Subscription | undefined;
  dias: Date[] = [];
  private diasSubscription: Subscription | undefined;
  horarios: Time[] = [];
  private horariosSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: ConsultaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private pacienteService: PacienteService,
    private agendaService: AgendaService,
    private rota: Router,
    private route: ActivatedRoute
  ) {
    this.buscarPacientes();
    this.buscarDias();
    this.form = this.formBuilder.group({
      id: [null],
      data: [null],
      horaInicial: [null],
      pacienteId: [null],
      agendaId: [null],

    });

    this.form.get('data')?.valueChanges.subscribe((data) => {
      this.onDataOrAgendaChange();
    });

    this.form.get('agendaId')?.valueChanges.subscribe((agendaId) => {
      this.onDataOrAgendaChange();
    });

  }

  ngOnInit(): void {
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

  buscarPacientes() {
    this.pacientesSubscription = this.pacienteService.list("ATIVO")
      .subscribe(
        (paciente: Paciente[]) => {
          this.pacientes = paciente;
        },
        (error: any) => {
          this.error('Erro ao carregar Pacientes');
          console.log(error);
        }
      );
  }

  buscarAgendas(dia: Date) {
    this.agendasSubscription = this.service.buscarAgendaPorData(dia)
      .subscribe(
        (agenda: Agenda[]) => {
          this.agendas = agenda;
        },
        (error: any) => {
          this.error('Erro ao carregar Agendas');
          console.log(error);
        }
      );
  }

  buscarDias() {
    this.diasSubscription = this.service.buscarDatas()
      .subscribe(
        (dias: Date[]) => {
          this.dias = dias;
        },
        (error: any) => {
          this.error('Erro ao carregar Dias');
          console.log(error);
        }
      );
  }

  onDataOrAgendaChange() {
    const data = this.form.get('data')?.value;
    const agendaId = this.form.get('agendaId')?.value;

    if (data && agendaId) {
      this.buscarHorarios(data, agendaId);
    }
  }

  buscarHorarios(id: number, data: Date) {
    this.horariosSubscription = this.service.buscarHorariosLivres(id, data)
      .subscribe(
        (horarios: Time[]) => {
          this.horarios = horarios;
        },
        (error: any) => {
          this.error('Erro ao carregar Horarios');
          console.log(error);
        }
      );
  }


  onCancel() {
    this.rota.navigate(['/consultas'])
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

  private formatarData = (data: Date): string => {
    const dataString = data.toString();
    const partesData = dataString.split('/');
    const dataObjeto = new Date(
      +partesData[2],
      +partesData[1] - 1,
      +partesData[0]
    );

    const year = dataObjeto.getFullYear();
    const month = ('0' + (dataObjeto.getMonth() + 1)).slice(-2);
    const day = ('0' + dataObjeto.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };
}
