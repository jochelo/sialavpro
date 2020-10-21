import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  auth: null;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: null
};
