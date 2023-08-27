import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/pacientes';
  constructor(private http: HttpClient) {}

  cadastrarPaciente(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/cadastrar-paciente`, categoria);
  }

  getPaciente(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
  }
  
  atualizarPaciente(idCategoria: number, categoria: Categoria): Observable<Categoria> {
    console.log('ID do Paciente:', idCategoria);
    console.log('Objeto Paciente:', categoria);
    return this.http.put<Categoria>(`${this.apiUrl}/editar-paciente/${idCategoria}`, categoria);
  }
  
  excluirPaciente(idCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-paciente/${idCategoria}`);
  }

  getPacienteByName(tipoCategoria: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/nome/${tipoCategoria}`)
  }


  getIdPaciente(idCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${idCategoria}`);
  }
}
