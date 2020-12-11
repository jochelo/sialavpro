import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  paginateClientes(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-clientes`, data);
  }

  storeCliente(data: any): Observable<any> {
    return this.http.post(`${this.base}store-cliente`, data);
  }

  updateCliente(data: any): Observable<any> {
    return this.http.post(`${this.base}update-cliente`, data);
  }

  deleteCliente(idcliente: number): Observable<any> {
    return this.http.delete(`${this.base}delete-cliente/${idcliente}`);
  }
}
