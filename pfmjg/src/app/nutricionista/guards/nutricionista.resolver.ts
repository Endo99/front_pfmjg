import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Nutricionista } from 'src/app/model/nutricionista';
import { NutricionistaService } from 'src/app/services/nutricionista.service';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaResolver implements Resolve<Nutricionista> {

  constructor(
    private service: NutricionistaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nutricionista> {
    if (route.params && route.params['id']) {
      return this.service.buscarPorId(route.params['id']);
    }
    return of({
      id: 0,
      cpf: '',
      nome: '',
      descricao: '',
      telefone: '',
      situacao: '',
      categoriasDescricao: [],
      categoriasIds: [],
    });
  }
}
