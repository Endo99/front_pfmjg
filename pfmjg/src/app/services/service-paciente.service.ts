import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, delay } from 'rxjs';
import { Paciente } from '../models/paciente';
import { PacienteDTO } from '../models/dto/paciente-dto';

@Injectable(
)
export class ServicePaciente {
  private readonly apiUrl = 'http://localhost:8080/pfmjg/pacientes';

  private readonly otherAPIUrl = 'http://localhost:8080/pfmjg/api';
  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/cadastrar-paciente`, paciente);
  }

  getPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarPaciente(idPaciente: number, paciente: Paciente): Observable<Paciente> {
    console.log('ID do Paciente:', idPaciente);
    console.log('Objeto Paciente:', paciente);
    return this.http.put<Paciente>(`${this.apiUrl}/editar-paciente/${idPaciente}`, paciente);
  }
  
  excluirPaciente(idPaciente: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-paciente/${idPaciente}`);
  }

  getPacienteByName(nomePaciente: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/nome/${nomePaciente}`)
  }

  getAllPacienteIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getIdPaciente(idPaciente: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${idPaciente}`);
  }

  getPacienteByCPFANDIdPaciente(cpf: String, idPaciente: number) {
    return this.http.get<Paciente>(`${this.apiUrl}/procurar/${cpf}/${idPaciente}`)
  }

  getNomeAndCPF() {
    return this.http.get<Paciente>(`${this.otherAPIUrl}/listar-cpf-nome`)
  }

  getPacientePorCPF(cpf: string): Observable<PacienteDTO> {
    return this.http.get<PacienteDTO>(`${this.apiUrl}/detalhes/${cpf}`);
  }
  // private atualizarPaciente(paciente: Paciente): Observable<Paciente> {
  //   const url = '${this.apiUrl}/${/editar-paciente-paciente.id}';
  //   return this.http.put<Paciente>(url, paciente);
  // }
  // buscarPorNome()

}
