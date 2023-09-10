import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento/agendamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAgendamento {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/Agendamentos';
  constructor(private http: HttpClient) {}

  cadastrarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.apiUrl}/cadastrar-agendamento`, agendamento);
  }

  getAgendamento(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarAgendamento(idAgendamento: number, agendamento: Agendamento): Observable<Agendamento> {
    console.log('ID do Agendamento:', idAgendamento);
    console.log('Objeto Agendamento:', agendamento);
    return this.http.put<Agendamento>(`${this.apiUrl}/editar-agendamento/${idAgendamento}`, agendamento);
  }
  
  excluirAgendamento(idAgendamento: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-agendamento/${idAgendamento}`);
  }

  getAgendamentoByName(nomeAgendamento: string): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/nome/${nomeAgendamento}`)
  }

  getAllAgendamentoIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getIdAgendamento(idAgendamento: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${idAgendamento}`);
  }
}
