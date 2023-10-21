import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosRelationadosDTO } from '../models/dadosRelacionados/dados-relationados-dto';

@Injectable({
  providedIn: 'root'
})
export class DadosRelacionadosService {

  private baseUrl = 'http://localhost:8080/pfmjg/api'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getDadosRelacionados(): Observable<DadosRelationadosDTO> {
    
    return this.http.get<DadosRelationadosDTO>(`${this.baseUrl}/dados-relacionados`);
  }

}
