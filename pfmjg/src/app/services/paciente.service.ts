import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http'
import { delay, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private readonly apiUrl = 'http://localhost:8080/pfmjg/api/paciente';

  constructor(private httpClient: HttpClient) { }

  list(record: String) {
    return this.httpClient.get<Paciente[]>(`${this.apiUrl}?situacao=${record}`)
      .pipe(
        first(),
        tap(pacientes => console.log(pacientes))
      );
  }

  save(record: Paciente) {
    console.log(record.id);
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  create(record: Paciente) {
    console.log(record);
    return this.httpClient.post<Paciente>(`${this.apiUrl}`, record).pipe(first());
  }

  update(record: Paciente) {
    console.log(record);
    return this.httpClient.put<Paciente>(`${this.apiUrl}/${record.id}/alterar`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/inativar`, id).pipe(first());
  }

  ativar(id: number) {
    return this.httpClient.put(`${this.apiUrl}/${id}/ativar`, id).pipe(first());
  }

  buscarPorId(id: number) {
    return this.httpClient.get<Paciente>(`${this.apiUrl}/${id}/buscar`).pipe(first());
  }
}
