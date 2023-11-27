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

  list(record: String) {
    return this.httpClient.get<Agenda[]>(`${this.apiUrl}?situacao=${record}`)
      .pipe(
        first(),
        tap(agenda => console.log(agenda))
      );
  }

  save(record: Agenda) {
    console.log(record.id);
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  create(record: Agenda) {
    console.log(record);
    return this.httpClient.post<Agenda>(`${this.apiUrl}`, record).pipe(first());
  }

  update(record: Agenda) {
    console.log(record);
    return this.httpClient.put<Agenda>(`${this.apiUrl}/${record.id}/alterar`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/inativar`, id).pipe(first());
  }

  ativar(id: number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/ativar`, id).pipe(first());
  }

  buscarPorId(id: number) {
    return this.httpClient.get<Agenda>(`${this.apiUrl}/${id}/buscar`).pipe(first());
  }
}
