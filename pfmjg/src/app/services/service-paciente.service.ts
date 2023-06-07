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
    return this.http.post<Paciente>(`${this.apiUrl}/cadastrar-paciente`, paciente);
  }

  getPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/listar`);
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  

  atualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    console.log('ID do Paciente:', id);
    console.log('Objeto Paciente:', paciente);
    return this.http.put<Paciente>(`${this.apiUrl}/editar-paciente/${id}`, paciente);
  }
  
  excluirPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-paciente-${id}`);
  }

  getPacienteByName(nomePaciente: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/nome-${nomePaciente}`)
  }

  getAllPacienteIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getIdPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }


  // private atualizarPaciente(paciente: Paciente): Observable<Paciente> {
  //   const url = '${this.apiUrl}/${/editar-paciente-paciente.id}';
  //   return this.http.put<Paciente>(url, paciente);
  // }
  // buscarPorNome()

}
