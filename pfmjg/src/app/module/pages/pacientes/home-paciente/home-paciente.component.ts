import { NgForOf } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
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
  pacienteSelecionado: any = null;

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

  constructor(private pacienteService: ServicePaciente, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.pacienteService.getPaciente().subscribe(
      pacientes => {
        this.pacientes = pacientes;
        console.log(pacientes);
      },
      error => {
        console.error('Erro ao carregar pacientes: ', error);
      }
    );
  }
  
  buscarPaciente(id: string): void {
    this.pacienteService.getPacienteById(parseInt(id)).subscribe(
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
    if (this.pacienteSelecionado) {
      // Implemente sua lógica de exclusão aqui
      // Por exemplo, você pode chamar um serviço para excluir o paciente
      // e atualizar a lista de pacientes após a exclusão

      // Aqui está um exemplo de como você pode remover o paciente da lista
      const index = this.pacientes.indexOf(this.pacienteSelecionado);
      if (index > -1) {
        this.pacientes.splice(index, 1);
      }

      // Após a exclusão, você pode redefinir o paciente selecionado e fechar o pop-up
      this.pacienteSelecionado = null;
      this.exibirPopupExclusao = false;
    }
  }

  abrirPopupExclusao(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.exibirPopupExclusao = true;
  }
    // Lógica para excluir o paciente
    // ...
    // Após a exclusão, você pode atualizar a lista de pacientes, se necessário.
}
