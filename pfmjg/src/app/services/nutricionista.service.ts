
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nutricionista } from '../models/nutricionista/nutricionista';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  private baseUrl = 'http://localhost:8080/pfmjg/api/nutricionista'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  listarNutricionista(): Observable<Nutricionista[]> {
    return this.http.get<Nutricionista[]>(`${this.baseUrl}`);
  }

  cadastrarNutricionistaAConta(nutricionista: Nutricionista): Observable<Nutricionista> {
    return this.http.post<Nutricionista>(`${this.baseUrl}`, nutricionista);
  }

  editarNutricionista(id: number, nutricionista: Nutricionista): Observable<Nutricionista> {
    return this.http.put<Nutricionista>(`${this.baseUrl}/${id}/alterar`, nutricionista);
  }

  deletarNutricionista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }

  ativarNutricionista(id: number): Observable<Nutricionista> {
    return this.http.get<Nutricionista>(`${this.baseUrl}/${id}/ativar/`);
  }

  desativarNutricionista(id: number): Observable<Nutricionista> {
    return this.http.get<Nutricionista>(`${this.baseUrl}/${id}/inativar/`);
  }

  getById(id: number): Observable<Nutricionista> {
    return this.http.get<Nutricionista>(`${this.baseUrl}/${id}/buscar`);
  }
}
