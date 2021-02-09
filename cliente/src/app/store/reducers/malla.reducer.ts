import {Action, createReducer, on} from '@ngrx/store';
import {Malla} from '../../models/malla';
import {Paginate} from '../../models/paginate';
import {
  deleteMalla, deleteMallaFailure, deleteMallaSuccess,
  editMalla, getMallas, getMallasFailure, getMallasSuccess,
  irVistaMalla,
  paginateMallas,
  paginateMallasFailure,
  paginateMallasSuccess,
  storeMalla,
  storeMallaFailure,
  storeMallaSuccess, updateMalla, updateMallaFailure, updateMallaSuccess
} from '../actions/malla.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const mallaFeatureKey = 'malla';

export interface MallaState {
  malla: Malla;
  mallas: Malla[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: any;
}

export const initialState: MallaState = {
  malla: null,
  mallas: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const mallaReducer = createReducer(
  initialState,
  on(irVistaMalla, (state: MallaState, props) => ({
    ...state,
    location: props.location
  })),
  on(getMallas, (state: MallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Mallas',
  })),
  on(getMallasSuccess, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    mallas: props.mallas,
    message: null,
    error: null,
  })),
  on(getMallasFailure, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateMallas, (state: MallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Mallas',
  })),
  on(paginateMallasSuccess, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    mallas: props.mallas,
    paginacion: props.paginacion,
    error: null,
    message: null
  })),
  on(paginateMallasFailure, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeMalla, (state: MallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Malla',
    error: null,
  })),
  on(storeMallaSuccess, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    mallas: [...state.mallas, props.malla],
    malla: props.malla,
    message: null,
  })),
  on(storeMallaFailure, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editMalla, (state: MallaState, props) => ({
    ...state,
    malla: props.malla,
    location: 'edit'
  })),
  on(updateMalla, (state: MallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Malla'
  })),
  on(updateMallaSuccess, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    mallas: state.mallas.map( (malla: Malla) => {
      if (malla.id === props.malla.id) {
        return props.malla;
      }
      return malla;
    }),
    message: null,
    error: null,
  })),
  on(updateMallaFailure, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteMalla, (state: MallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Malla'
  })),
  on(deleteMallaSuccess, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    mallas: state.mallas.filter( (malla: Malla) => malla.id !== props.idmalla),
    error: null,
    message: null,
  })),
  on(deleteMallaFailure, (state: MallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: MallaState | undefined, action: Action): any {
  return mallaReducer(state, action);
}
