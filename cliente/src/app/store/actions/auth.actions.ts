import {createAction, props} from '@ngrx/store';
import {Usuario} from '../../models/usuario';

export const login = createAction(
  '[Usuario] Login',
  props<{ cuenta: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Usuario] Login Success',
  props<{ token: string, usuario: Usuario }>()
);

export const loginFailure = createAction(
  '[Usuario] Login Failure',
  props<{ error: any }>()
);

export const setAuth = createAction(
  '[Usuario] Set auth'
);
export const setAuthSuccess = createAction(
  '[Usuario] Set auth Success',
  props<{ usuario: Usuario }>()
);
export const setAuthFailure = createAction(
  '[Usuario] Set auth Failure',
  props<{ error: any }>()
);
