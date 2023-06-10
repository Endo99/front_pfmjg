import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, delay } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable(
)
export class ServicePaciente {
  private readonly apiUrl = 'http://localhost:8080/pfmjg/pacientes';
  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/adastrar-paciente`, paciente);
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


  // private atualizarPaciente(paciente: Paciente): Observable<Paciente> {
  //   const url = '${this.apiUrl}/${/editar-paciente-paciente.id}';
  //   return this.http.put<Paciente>(url, paciente);
  // }
  // buscarPorNome()

}
