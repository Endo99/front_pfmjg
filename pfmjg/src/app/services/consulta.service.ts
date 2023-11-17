import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from '../model/consulta';
import { first, tap } from 'rxjs/operators';
import { Agenda } from '../model/agenda';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/consulta';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Consulta[]>(`${this.apiUrl}`)
      .pipe(
        first(),
        tap(consultas => console.log(consultas))
      );
  }

  save(record: Consulta) {
    console.log(record);
    return this.httpClient.post<Consulta>(`${this.apiUrl}`, record).pipe(first());
  }

  buscarDatas() {
    return this.httpClient.get<Date[]>(`${this.apiUrl}/dias-agenda`)
      .pipe(first());
  }

  buscarAgendaPorData(data:Date) {
    return this.httpClient.get<Agenda[]>(`${this.apiUrl}/${data}/list-agenda`)
      .pipe(first());
  }

  buscarHorariosLivres(id:number, data:Date) {
    return this.httpClient.get<Time[]>(`${this.apiUrl}/${data}/${id}/horarios-livres`)
      .pipe(first());
  }

  cancelar(id:number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/cancelar`,id).pipe(first());
  }

  finalizar(id:number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/finalizar`,id).pipe(first());
  }

  checkIn(id:number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/checkIn`,id).pipe(first());
  }
}
