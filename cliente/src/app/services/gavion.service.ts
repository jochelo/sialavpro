import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GavionService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  paginateGaviones(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-gaviones`, data);
  }

  storeGavion(data: any): Observable<any> {
    return this.http.post(`${this.base}store-gavion`, data);
  }

  updateGavion(data: any): Observable<any> {
    return this.http.post(`${this.base}update-gavion`, data);
  }

  deleteGavion(idgavion: number): Observable<any> {
    return this.http.delete(`${this.base}delete-gavion/${idgavion}`);
  }
}
