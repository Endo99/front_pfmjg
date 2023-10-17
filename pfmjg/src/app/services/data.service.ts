import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8080/pfmjg'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pacientes`);
  }

  getAgendamentos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/agendamentos`);
  }

  getConsultas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consultas`);
  }
}
