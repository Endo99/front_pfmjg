import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/categoria';

  constructor(
    private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}`)
      .pipe(
        first(),
        tap(categoria => console.log(categoria))
      );
  }

  save(record: Categoria) {
    console.log(record);
    return this.httpClient.post<Categoria>(`${this.apiUrl}`, record).pipe(first());
  }

  remove(id:number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}/deletar`).pipe(first());
  }
}
