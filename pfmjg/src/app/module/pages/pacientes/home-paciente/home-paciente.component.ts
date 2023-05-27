import { NgForOf } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';


@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit{

  pacientes: Paciente[] = [];

  constructor(private pacienteService: ServicePaciente, private router: Router) { }

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
      this.pacienteService.getPaciente().subscribe(data => {
      this.pacientes = data;
    })
  }
    // private paciente: Paciente;

    // console.log(paciente);
}
