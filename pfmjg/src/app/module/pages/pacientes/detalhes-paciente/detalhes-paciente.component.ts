import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss']
})
export class DetalhesPacienteComponent implements OnInit{
  
  id: number = 0;
  
  pacientes: Paciente[] = [];
  
  selectedPaciente: any;

  paciente: Paciente = {
    idPaciente: 0,
    nomePaciente: '',
    dataNascimentoPaciente: new Date(),
    idadePaciente: 0,
    cidade: '',
    estado: '',
    telefone: '',
  };

  constructor(private pacienteService: ServicePaciente, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarPacientes();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
    }
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


  openPopup(paciente: any) {
    this.selectedPaciente = paciente;
  }

  closePopup() {
    this.selectedPaciente = null;
    this.router.navigate(['/pacientes']);
  }
  
}
