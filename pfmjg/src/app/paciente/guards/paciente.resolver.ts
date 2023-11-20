import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteResolver implements Resolve<Paciente> {

  constructor(
    private service: PacienteService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paciente> {
    if (route.params && route.params['id']) {
      return this.service.buscarPorId(route.params['id']);
    }
    return of({
      id: 0,
      cpf: '',
      nome: '',
      dataNascimento: new Date(),
      idade: 0,
      cidade: '',
      estado: '',
      telefone: '',
      situacao: ''
    });
  }
}
