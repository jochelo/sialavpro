import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.search('/login') === -1) {
      if (localStorage.getItem('token-prodag') !== null) {
        const tokenProdag = atob(localStorage.getItem('token-prodag'));
        const customReq = request.clone({
          headers: new HttpHeaders().set('Authorization', tokenProdag)
        });
        return next.handle(customReq);
      } else {
        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}
