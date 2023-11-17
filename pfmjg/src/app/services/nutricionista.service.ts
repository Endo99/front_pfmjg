import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { Nutricionista } from '../model/nutricionista';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/nutricionista';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Nutricionista[]>(`${this.apiUrl}?situacao=ATIVO`)
    .pipe(
      first(),
      tap(nutricionista => console.log(nutricionista))
    );
  }

  save(record: Nutricionista) {
    console.log(record);
    return this.httpClient.post<Nutricionista>(`${this.apiUrl}`, record).pipe(first());
  }

  remove(id:number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/inativar`,id).pipe(first());
  }
}
