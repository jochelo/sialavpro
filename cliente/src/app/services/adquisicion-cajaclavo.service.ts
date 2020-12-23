import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionCajaclavoService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getAdquisicionCajaclavos(): Observable<any> {
    return this.http.get(`${this.base}get-adquisicion-cajaclavos`);
  }

  paginateAdquisicionCajaclavos(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-adquisicion-cajaclavos`, data);
  }

  storeAdquisicionCajaclavo(data: any): Observable<any> {
    return this.http.post(`${this.base}store-adquisicion-cajaclavo`, data);
  }

  updateAdquisicionCajaclavo(data: any): Observable<any> {
    return this.http.post(`${this.base}update-adquisicion-cajaclavo`, data);
  }

  deleteAdquisicionCajaclavo(idadquisicionCajaclavo: number): Observable<any> {
    return this.http.delete(`${this.base}delete-adquisicion-cajaclavo/${idadquisicionCajaclavo}`);
  }
}
