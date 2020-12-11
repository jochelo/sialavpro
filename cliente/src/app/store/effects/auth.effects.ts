import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {login, loginFailure, loginSuccess, setAuth, setAuthFailure, setAuthSuccess} from '../actions/auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Usuario} from '../../models/usuario';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

  login$ = createEffect( () =>
    this.actions$
      .pipe(
        ofType(login),
          switchMap( (props: { cuenta: string, password: string }) => {
            return this.authService.login(props)
              .pipe(
                map( (response: { token: string, usuario: Usuario }) => {
                  this.router.navigate(['/admin']);
                  return loginSuccess(response);
                }),
                catchError( error => of(loginFailure(error)))
              );
          })
      ));

  setAuth$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(setAuth),
        switchMap(() => {
          return this.authService.getUser()
            .pipe(
              map((response: {
                success: Usuario
              }) => {
                return setAuthSuccess({
                  usuario: response.success
                });
              }),
              catchError(error => {
                this.router.navigate(['/login']);
                return of(setAuthFailure(error));
              })
            );
        })
      )
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router){}

}
