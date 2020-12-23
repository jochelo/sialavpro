import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionAlambreService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getAdquisicionAlambres(): Observable<any> {
    return this.http.get(`${this.base}get-adquisicion-alambres`);
  }

  paginateAdquisicionAlambres(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-adquisicion-alambres`, data);
  }

  storeAdquisicionAlambre(data: any): Observable<any> {
    return this.http.post(`${this.base}store-adquisicion-alambre`, data);
  }

  updateAdquisicionAlambre(data: any): Observable<any> {
    return this.http.post(`${this.base}update-adquisicion-alambre`, data);
  }

  deleteAdquisicionAlambre(idadquisicionAlambre: number): Observable<any> {
    return this.http.delete(`${this.base}delete-adquisicion-alambre/${idadquisicionAlambre}`);
  }
}
