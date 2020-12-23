import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduccionGavionService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  paginateProduccionGavionesFecha(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-produccion-gaviones-fecha`, data);
  }

  storeProduccionGavionIndividual(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-gavion-individual`, data);
  }

  storeProduccionGavionGrupal(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-gavion-grupal`, data);
  }

  storeProduccionGavionSinCupo(data: any): Observable<any> {
    return this.http.post(`${this.base}store-produccion-gavion-sin-cupo`, data);
  }

  updateProduccionGavion(data: any): Observable<any> {
    return this.http.post(`${this.base}update-produccion-gavion`, data);
  }

  deleteProduccionGavion(idproduccionGavion: number): Observable<any> {
    return this.http.delete(`${this.base}delete-produccion-gavion/${idproduccionGavion}`);
  }
}
