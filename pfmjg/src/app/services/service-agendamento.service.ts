import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento/agendamento';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class ServiceAgendamento {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/agendamentos';
  constructor(private http: HttpClient) {}

  cadastrarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.apiUrl}/cadastrar-agenda`, agendamento);
  }

  getAgendamento(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarAgendamento(idAgendamento: number, agendamento: Agendamento): Observable<Agendamento> {
    console.log('ID do Agendamento:', idAgendamento);
    console.log('Objeto Agendamento:', agendamento);
    return this.http.put<Agendamento>(`${this.apiUrl}/editar-agenda/${idAgendamento}`, agendamento);
  }
  
  excluirAgendamento(idAgendamento: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-agenda/${idAgendamento}`);
  }

  getAllAgendamentoIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getIdAgendamento(idAgendamento: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/id/${idAgendamento}`);
  }

  getPaciente(IdAgenda: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/paciente/${IdAgenda}`);
  }
}
