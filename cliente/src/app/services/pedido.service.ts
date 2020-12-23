import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getPedidos(): Observable<any> {
    return this.http.get(`${this.base}get-pedidos`);
  }

  paginatePedidos(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-pedidos`, data);
  }

  storePedido(data: any): Observable<any> {
    return this.http.post(`${this.base}store-pedido`, data);
  }

  updatePedido(data: any): Observable<any> {
    return this.http.post(`${this.base}update-pedido`, data);
  }

  updateImportePedido(data: any): Observable<any> {
    return this.http.post(`${this.base}update-importe-pedido`, data);
  }

  deletePedido(idpedido: number): Observable<any> {
    return this.http.delete(`${this.base}delete-pedido/${idpedido}`);
  }
}
