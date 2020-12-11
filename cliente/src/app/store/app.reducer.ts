import {ActionReducerMap} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import {AuthState} from './reducers/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer
};
