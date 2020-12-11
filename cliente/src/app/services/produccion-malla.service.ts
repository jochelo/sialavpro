import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduccionMallaService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  paginateProduccionMallasFecha(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-produccion-mallas-fecha`, data);
  }

  storeProduccionMallaIndividual(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-malla-individual`, data);
  }

  storeProduccionMallaGrupal(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-malla-grupal`, data);
  }

  storeProduccionMallaSinCupo(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-malla-sin-cupo`, data);
  }

  updateProduccionMalla(data: any): Observable<any> {
    return this.http.post(`${this.base}update-produccion-malla`, data);
  }

  deleteProduccionMalla(idproduccionMalla: number): Observable<any> {
    return this.http.delete(`${this.base}delete-produccion-malla/${idproduccionMalla}`);
  }
}
