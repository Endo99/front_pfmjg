import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Consulta } from 'src/app/model/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResolver implements Resolve<Consulta> {

  constructor(
    private service: ConsultaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Consulta> {
    if (route.params && route.params['id']) {
      return this.service.buscarPorId(route.params['id']);
    }
    return of({
      id: 0,
      data: new Date(),
      dataFinal: new Date(),
      horaInicial: null,
      horaFinal: null,
      periodo: null,
      situacao: '',
      pacienteNome: '',
      agendaNutricionista: ''
    });
  }
}
