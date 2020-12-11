import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getEmpleadosMalleros(): Observable<any> {
    return this.http.get(`${this.base}get-empleados-malleros`);
  }

  paginateEmpleados(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-empleados`, data);
  }

  storeEmpleado(data: any): Observable<any> {
    return this.http.post(`${this.base}store-empleado`, data);
  }

  updateEmpleado(data: any): Observable<any> {
    return this.http.post(`${this.base}update-empleado`, data);
  }

  deleteEmpleado(idempleado: number): Observable<any> {
    return this.http.delete(`${this.base}delete-empleado/${idempleado}`);
  }
}
