import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { Agenda } from '../model/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/agenda';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Agenda[]>(`${this.apiUrl}?situacao=ATIVO`)
      .pipe(
        first(),
        tap(agenda => console.log(agenda))
      );
  }

  save(record: Agenda) {
    console.log(record);
    return this.httpClient.post<Agenda>(`${this.apiUrl}`, record).pipe(first());
  }

  remove(id:number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/inativar`,id).pipe(first());
  }
}
