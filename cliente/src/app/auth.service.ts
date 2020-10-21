import {Injectable} from '@angular/core';
import {environment} from '../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  getUser(): any {
    return this.http.get(`${this.base}users`);
  }
}
