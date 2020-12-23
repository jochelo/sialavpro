import {Action, createReducer, on} from '@ngrx/store';
import {Gavion} from '../../models/gavion';
import {Paginate} from '../../models/paginate';
import {
  deleteGavion,
  deleteGavionFailure,
  deleteGavionSuccess,
  editGavion,
  getGaviones,
  getGavionesFailure,
  getGavionesSuccess,
  irVistaGavion,
  paginateGaviones,
  paginateGavionesFailure,
  paginateGavionesSuccess,
  storeGavion,
  storeGavionFailure,
  storeGavionSuccess,
  updateGavion,
  updateGavionFailure,
  updateGavionSuccess
} from '../actions/gavion.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const gavionFeatureKey = 'gavion';

export interface GavionState {
  gavion: Gavion;
  gaviones: Gavion[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: GavionState = {
  gavion: null,
  gaviones: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const gavionReducer = createReducer(
  initialState,
  on(irVistaGavion, (state: GavionState, props) => ({
    ...state,
    location: props.location
  })),
  on(getGaviones, (state: GavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Gaviones',
  })),
  on(getGavionesSuccess, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    gaviones: props.gaviones,
    message: null,
  })),
  on(getGavionesFailure, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateGaviones, (state: GavionState, props) => ({
    ...state,
    loading: true,
    message: 'Cargando Lista de Gaviones',
    loaded: false,
  })),
  on(paginateGavionesSuccess, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    gaviones: props.gaviones,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateGavionesFailure, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeGavion, (state: GavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Gavion'
  })),
  on(storeGavionSuccess, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    gaviones: [...state.gaviones, props.gavion],
    gavion: props.gavion,
    message: null,
  })),
  on(storeGavionFailure, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editGavion, (state: GavionState, props) => ({
    ...state,
    gavion: props.gavion,
    location: 'edit'
  })),
  on(updateGavion, (state: GavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Gavion'
  })),
  on(updateGavionSuccess, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    gaviones: state.gaviones.map((gavion: Gavion) => {
      if (gavion.id === props.gavion.id) {
        return props.gavion;
      }
      return gavion;
    }),
    message: null,
  })),
  on(updateGavionFailure, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteGavion, (state: GavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Gavion'
  })),
  on(deleteGavionSuccess, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    gaviones: state.gaviones.filter((gavion: Gavion) => gavion.id !== props.idgavion),
    message: null,
  })),
  on(deleteGavionFailure, (state: GavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: GavionState | undefined, action: Action): any {
  return gavionReducer(state, action);
}
