import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlambreService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getAlambres(): Observable<any> {
    return this.http.get(`${this.base}get-alambres`);
  }

  paginateAlambres(data: any): Observable<any> {
    return this.http.post(`${this.base}paginate-alambres`, data);
  }

  storeAlambre(data: any): Observable<any> {
    return this.http.post(`${this.base}store-alambre`, data);
  }

  updateAlambre(data: any): Observable<any> {
    return this.http.post(`${this.base}update-alambre`, data);
  }

  deleteAlambre(idalambre: number): Observable<any> {
    return this.http.delete(`${this.base}delete-alambre/${idalambre}`);
  }
}
