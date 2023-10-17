import { NgForOf } from '@angular/common';
import { Component, Directive, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Paciente } from 'src/app/models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';
@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit{

  exibirPopupExclusao = false;
  pacienteSelecionado: Paciente | null = null;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedPaciente: any;

  pacientes: Paciente[] = [];

  id: string = '';

  agendamento: Agendamento = {
    idAgendamento: 0,
    idPaciente: 0,
  }

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: '',
  };

  constructor(private pacienteService: ServicePaciente, private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private toastr: ToastrService) {
     }

  ngOnInit(): void {
    
    this.listarPacientes();
    if (this.pacienteSelecionado) {
      this.renderer.addClass(document.body, 'paciente-selecionado');
    }
  }
  
  listarPacientes(): void {
      this.pacienteService.getPaciente().subscribe(data => {
      this.pacientes = data;
      this.sortPacientesByNome();
    })
  }
  
  buscarPaciente(id: string): void {
    this.pacienteService.getIdPaciente(parseInt(id)).subscribe(
      paciente => {
        this.paciente = paciente;
      },
      error => {
        console.error('Erro ao buscar paciente: ', error);
      }
    );
  }

  salvarPaciente(): void {
    if (this.paciente.idPaciente) {
      this.pacienteService.atualizarPaciente(this.paciente.idPaciente, this.paciente).subscribe(
        response => {
          this.router.navigate(['/pacientes']);
        },
        error => {
          console.error('Erro ao salvar paciente: ', error);
        }
      );
    } else {
      console.error('ID do paciente não definido.');
    }
  }

  excluirPaciente() {


    if (this.pacienteSelecionado && this.pacienteSelecionado.idPaciente) {

      const idPaciente = this.pacienteSelecionado.idPaciente;
      this.pacienteService.excluirPaciente(idPaciente). subscribe( () => {
        
        
        
        this.sucessMessage = "Paciente Excluído!";
        this.exibirMensagem = true;
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.router.navigate(['pacientes']);
        }, 2000)
        this.listarPacientes();

        this.pacienteSelecionado = null;
        this.exibirPopupExclusao = false;
      });
    
    }
    else  {
        console.log("Não encontrado ou erro");
    }
  }

  selecionarPaciente(paciente: Paciente): void {
    this.pacienteSelecionado = paciente;
  }

  openPopup(paciente: any) {
    console.log("Clicou");
    console.log(this.selectedPaciente = paciente);
    this.selectedPaciente = paciente;
  
  }

  closePopup() {
    this.selectedPaciente = null;
    this.router.navigate(['/pacientes']);
  }

  sortPacientesByNome() {
    this.pacientes = this.pacientes.filter(paciente => paciente.nomePaciente !== undefined);
    this.pacientes.sort((a, b) => {
    const nomeA = a.nomePaciente!.toLowerCase();
    const nomeB = b.nomePaciente!.toLowerCase();
    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  });
  }
  
  voltarPagina(): void {
    this.router.navigate(['pacientes'])
  }

}
