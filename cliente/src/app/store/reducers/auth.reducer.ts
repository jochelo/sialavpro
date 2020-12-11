import {Action, createReducer, on} from '@ngrx/store';
import {Usuario} from '../../models/usuario';
import {login, loginFailure, loginSuccess, setAuth, setAuthFailure, setAuthSuccess} from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  usuario: Usuario;
  token: string;
  logged: boolean;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: Error;
}

export const initialState: AuthState = {
  usuario: null,
  token: null,
  logged: false,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(login, (state: AuthState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: null,
    error: null
  })),
  on(loginSuccess, (state: AuthState, props) => ({
    ...state,
    usuario: props.usuario,
    token: props.token,
    logged: true,
    loading: false,
    loaded: true,
  })),
  on(loginFailure, (state: AuthState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: 'Credenciales Incorrectas',
    error: props.error
  })),
  on(setAuth, (state: AuthState) => ({
    ...state,
    loading: true
  })),
  on(setAuthSuccess, (state: AuthState, props) => ({
    ...state,
    loading: false,
    logged: true,
    loaded: true,
    usuario: props.usuario
  })),
  on(setAuthFailure, (state: AuthState, props) => ({
    ...state,
    loading: false,
    logged: false,
    loaded: false,
    error: props.error
  })),
);

export function reducer(state: AuthState | undefined, action: Action): any {
  return authReducer(state, action);
}
