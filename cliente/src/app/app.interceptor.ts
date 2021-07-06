import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(public router: Router,
              private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.search('/login') === -1) {
      if (localStorage.getItem('token-prodag') !== null) {

        const tokenProdag = atob(localStorage.getItem('token-prodag'));
        const payload = tokenProdag.split('.')[1];
        const value = atob(payload);
        const json = JSON.parse(value);
        const now = Math.floor(Date.now() / 1000);
        if (json.exp >= now) {
          const customReq = request.clone({
            headers: new HttpHeaders().set('Authorization', tokenProdag)
          });
          return next.handle(customReq);
        } else {
          this.toastr.error('Su sesión ya caduco!');
          this.router.navigate(['/']);
          localStorage.removeItem('token-prodag');
          return next.handle(request);
        }
      } else {
        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}
