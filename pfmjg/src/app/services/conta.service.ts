import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conta } from '../models/conta/conta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private baseUrl = 'http://localhost:8080/contas'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  listarContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.baseUrl}/listar`);
  }

  cadastrarConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.baseUrl}/cadastrar`, conta);
  }

  atualizarConta(id: number, conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.baseUrl}/atualizar/${id}`, conta);
  }

  deletarConta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }
}
