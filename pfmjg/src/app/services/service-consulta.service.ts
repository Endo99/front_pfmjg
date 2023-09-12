import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta/consulta';

@Injectable({
  providedIn: 'root'
})
export class ServiceConsulta {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/consultas';
  constructor(private http: HttpClient) {}

  cadastrarConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/cadastrar-consulta`, consulta);
  }

  getConsulta(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarConsulta(idConsulta: number, consulta: Consulta): Observable<Consulta> {
    console.log('ID do Consulta:', idConsulta);
    console.log('Objeto Consulta:', consulta);
    return this.http.put<Consulta>(`${this.apiUrl}/editar-consulta/${idConsulta}`, Consulta);
  }
  
  excluirConsulta(idConsulta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-consulta/${idConsulta}`);
  }

  getConsultaByName(nomeConsulta: string): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/nome/${nomeConsulta}`)
  }

  getAllConsultaIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getIdConsulta(idConsulta: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${idConsulta}`);
  }
}
