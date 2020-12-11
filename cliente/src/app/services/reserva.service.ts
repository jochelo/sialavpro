import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  paginateReservas(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-reservas`, data);
  }

  storeReserva(data: any): Observable<any> {
    return this.http.post(`${this.base}store-reserva`, data);
  }

  updateReserva(data: any): Observable<any> {
    return this.http.post(`${this.base}update-reserva`, data);
  }

  deleteReserva(idreserva: number): Observable<any> {
    return this.http.delete(`${this.base}delete-reserva/${idreserva}`);
  }

  recepcionar(data: any): Observable<any> {
    return this.http.post(`${this.base}recepcionar-reserva`, data);
  }
}
