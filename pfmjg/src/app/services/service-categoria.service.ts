import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/categoria';
  constructor(private http: HttpClient) {}

  cadastrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}`, categoria);
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }
  
  atualizarCategoria(idCategoria: number, categoria: Categoria): Observable<Categoria> {
    console.log('ID do Categoria:', idCategoria);
    console.log('Objeto categoria:', categoria);
    return this.http.put<Categoria>(`${this.apiUrl}/${idCategoria}/alterar`, categoria);
  }
  
  excluirCategoria(idCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCategoria}/deletar`);
  }

  getCategoriaByName(tipoCategoria: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/tipo/${tipoCategoria}`)
  }


  getIdCategoria(idCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${idCategoria}/buscar`);
  }
}
