import {AppState} from '../app.reducer';
import {createSelector} from '@ngrx/store';
import {AuthState} from '../reducers/auth.reducer';

export const selectAuth = (state: AppState) => state.auth;
export const selectCuentaUsuario = createSelector(selectAuth, (state: AuthState) => {
  return state.usuario !== null ? state.usuario.cuenta : null;
});
