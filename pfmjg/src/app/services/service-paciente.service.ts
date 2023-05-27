import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, delay } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable(
)
export class ServicePaciente {
  private readonly apiUrl = 'https://localhost:8080/pfmjg/pacientes';
  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>('${this.apiUrl}/cadastrar', paciente).pipe(first());
  }

  getPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>('${this.apiUrl}/listar');
  }

  atualizarPaciente(idPaciente: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>('${this.apiUrl}/editar-paciente-${idPaciente}', paciente);
  }

  excluirPaciente(idPaciente: number): Observable<void> {
    return this.http.delete<void>('${this.apiUrl}/deletar-paciente-${idPaciente}');
  }

  getPacienteByName(namePaciente: string): Observable<Paciente> {
    return this.http.get<Paciente>('${this.apiUrl}/nome-${nomePaciente}')
  }

  // private atualizarPaciente(paciente: Paciente): Observable<Paciente> {
  //   const url = '${this.apiUrl}/${/editar-paciente-paciente.id}';
  //   return this.http.put<Paciente>(url, paciente);
  // }
  // buscarPorNome()

}
