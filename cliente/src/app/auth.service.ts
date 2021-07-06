import {Injectable} from '@angular/core';
import {environment} from '../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.base;

  constructor(private http: HttpClient,
              public router: Router,
              private toastr: ToastrService) {
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
    this.toastr.success('Saliendo del sistema', 'Cerrando sesión');
    return this.http.get(`${this.base}logout`).pipe(
      map((response: any) => {
        localStorage.removeItem('token-prodag');
        this.toastr.warning(response.success, 'Sesión Finalizada');
        this.router.navigate(['/']);
      })
    );
    /*return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });*/
  }
}
