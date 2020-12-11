import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MallaService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getMallas(): Observable<any> {
    return this.http.get(`${this.base}get-mallas`);
  }

  paginateMallas(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-mallas`, data);
  }

  storeMalla(data: any): Observable<any> {
    return this.http.post(`${this.base}store-malla`, data);
  }

  updateMalla(data: any): Observable<any> {
    return this.http.post(`${this.base}update-malla`, data);
  }

  deleteMalla(idmalla: number): Observable<any> {
    return this.http.delete(`${this.base}delete-malla/${idmalla}`);
  }
}
