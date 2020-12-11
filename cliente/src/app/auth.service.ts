import {Injectable} from '@angular/core';
import {environment} from '../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.base}login`, data)
      .pipe(
        map( (success: any) => {
          const tokenAF = `Bearer ${success.token}`;
          localStorage.setItem('token-prodag', btoa(tokenAF));
          return success;
        })
      );
  }

  getUser(): Observable<any> {
    return this.http.post(`${this.base}get-user`, null);
  }

  logout(): Observable<any> {
    localStorage.removeItem('token-prodag');
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }
}
