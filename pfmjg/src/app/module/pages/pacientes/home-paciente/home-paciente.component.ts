import { NgForOf } from '@angular/common';
import { Component, Directive, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  selectedPaciente: any;

  pacientes: Paciente[] = [];

  id: string = '';

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: '',
    sobrenomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    statusPagamento: '',
    tipoConsulta: '',
    mesesAcompanhado: 0, 
    telefone: '',
    quantiaPaga: 0,
    formaPagamento: '',
    valorConsulta: 0,
  };

  constructor(private pacienteService: ServicePaciente, private router: Router, private route: ActivatedRoute, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.listarPacientes();
    if (this.pacienteSelecionado) {
      this.renderer.addClass(document.body, 'paciente-selecionado');
    }
  }

  listarPacientes(): void {
      this.pacienteService.getPaciente().subscribe(data => {
      this.pacientes = data;
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
        console.log('Paciente excluido com sucesso!');

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
  
}
