import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeonamesService {

  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor() { }

  getEstados(): Promise<any> {
    const url = `${this.apiUrl}/ufs/json/`;
    return axios.get(url).then(response => response.data);
  }

}
