
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControleCaixa } from '../models/controle-caixa/controle-caixa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControleCaixaService {

  private baseUrl = 'http://localhost:8080/pfmjg/controles'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  listarControleCaixa(): Observable<ControleCaixa[]> {
    return this.http.get<ControleCaixa[]>(`${this.baseUrl}/listar-todos`);
  }

  cadastrarControleCaixaAConta(controleCaixa: ControleCaixa): Observable<ControleCaixa> {
    return this.http.post<ControleCaixa>(`${this.baseUrl}/cadastrar`, controleCaixa);
  }

  editarControleCaixa(id: number, controleCaixa: ControleCaixa): Observable<ControleCaixa> {
    return this.http.put<ControleCaixa>(`${this.baseUrl}/editar/${id}`, controleCaixa);
  }

  deletarControleCaixa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }

  getIdControle(idControle: number): Observable<ControleCaixa> {
    return this.http.get<ControleCaixa>(`${this.baseUrl}/id/${idControle}`);
  }
}
