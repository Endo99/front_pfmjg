import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agenda } from 'src/app/model/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaResolver implements Resolve<Agenda> {

  constructor(
    private service: AgendaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agenda> {
    if (route.params && route.params['id']) {
      return this.service.buscarPorId(route.params['id']);
    }
    return of({
      id: 0,
      dataInicial: new Date(),
      dataFinal: new Date(),
      horaDiaInicial: null,
      horaDiaFinal: null,
      tempoPadrao: null,
      situacao: '',
      nutricionistaNome: ''
    });
  }
}
