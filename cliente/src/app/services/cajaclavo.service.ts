import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaclavoService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getCajaclavos(): Observable<any> {
    return this.http.get(`${this.base}get-cajaclavos`);
  }

  paginateCajaclavos(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-cajaclavos`, data);
  }

  storeCajaclavo(data: any): Observable<any> {
    return this.http.post(`${this.base}store-cajaclavo`, data);
  }

  updateCajaclavo(data: any): Observable<any> {
    return this.http.post(`${this.base}update-cajaclavo`, data);
  }

  deleteCajaclavo(idcajaclavo: number): Observable<any> {
    return this.http.delete(`${this.base}delete-cajaclavo/${idcajaclavo}`);
  }
}
