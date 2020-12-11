import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    base = environment.base;

    constructor(private http: HttpClient) {
    }

    login(data: any) {
        return this.http.post(`${this.base}login`, data)
            .pipe(
                map((success: any) => {
                    const tokenAF = `Bearer ${success.token}`;
                    localStorage.setItem('token-prodag', btoa(tokenAF));
                    return success;
                })
            );
    }

    logout() {
        localStorage.removeItem('token-prodag');
        return new Observable((observer) => {
            observer.next(true);
            observer.complete();
        });
    }
}
