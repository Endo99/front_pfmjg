import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/categorias';
  constructor(private http: HttpClient) {}

  cadastrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/cadastrar-categoria`, categoria);
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarCategoria(idCategoria: number, categoria: Categoria): Observable<Categoria> {
    console.log('ID do Categoria:', idCategoria);
    console.log('Objeto categoria:', categoria);
    return this.http.put<Categoria>(`${this.apiUrl}/editar-categoria/${idCategoria}`, categoria);
  }
  
  excluirCategoria(idCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-categoria/${idCategoria}`);
  }

  getCategoriaByName(tipoCategoria: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/tipo/${tipoCategoria}`)
  }


  getIdCategoria(idCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${idCategoria}`);
  }
}
