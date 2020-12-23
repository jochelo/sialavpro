import {Action, createReducer, on} from '@ngrx/store';
import {AdquisicionAlambre} from '../../models/adquisicion-alambre';
import {Paginate} from '../../models/paginate';
import {
  deleteAdquisicionAlambre, deleteAdquisicionAlambreFailure, deleteAdquisicionAlambreSuccess,
  editAdquisicionAlambre, getAdquisicionAlambres, getAdquisicionAlambresFailure, getAdquisicionAlambresSuccess,
  irVistaAdquisicionAlambre,
  paginateAdquisicionAlambres,
  paginateAdquisicionAlambresFailure,
  paginateAdquisicionAlambresSuccess,
  storeAdquisicionAlambre,
  storeAdquisicionAlambreFailure,
  storeAdquisicionAlambreSuccess, updateAdquisicionAlambre, updateAdquisicionAlambreFailure, updateAdquisicionAlambreSuccess
} from '../actions/adquisicion-alambre.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const adquisicionAlambreFeatureKey = 'adquisicion-alambre';

export interface AdquisicionAlambreState {
  adquisicionAlambre: AdquisicionAlambre;
  adquisicionAlambres: AdquisicionAlambre[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: AdquisicionAlambreState = {
  adquisicionAlambre: null,
  adquisicionAlambres: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const adquisicionAlambreReducer = createReducer(
  initialState,
  on(irVistaAdquisicionAlambre, (state: AdquisicionAlambreState, props) => ({
    ...state,
    location: props.location
  })),
  on(getAdquisicionAlambres, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de AdquisicionAlambres',
  })),
  on(getAdquisicionAlambresSuccess, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    adquisicionAlambres: props.adquisicionAlambres,
    message: null
  })),
  on(getAdquisicionAlambresFailure, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateAdquisicionAlambres, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de AdquisicionAlambres',
  })),
  on(paginateAdquisicionAlambresSuccess, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    adquisicionAlambres: props.adquisicionAlambres,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateAdquisicionAlambresFailure, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeAdquisicionAlambre, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando AdquisicionAlambre'
  })),
  on(storeAdquisicionAlambreSuccess, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    adquisicionAlambres: [...state.adquisicionAlambres, props.adquisicionAlambre],
    message: null,
  })),
  on(storeAdquisicionAlambreFailure, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editAdquisicionAlambre, (state: AdquisicionAlambreState, props) => ({
    ...state,
    adquisicionAlambre: props.adquisicionAlambre,
    location: 'edit'
  })),
  on(updateAdquisicionAlambre, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando AdquisicionAlambre'
  })),
  on(updateAdquisicionAlambreSuccess, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    adquisicionAlambres: state.adquisicionAlambres.map( (adquisicionAlambre: AdquisicionAlambre) => {
      if (adquisicionAlambre.id === props.adquisicionAlambre.id) {
        return props.adquisicionAlambre;
      }
      return adquisicionAlambre;
    }),
    message: null,
  })),
  on(updateAdquisicionAlambreFailure, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteAdquisicionAlambre, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando AdquisicionAlambre'
  })),
  on(deleteAdquisicionAlambreSuccess, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    adquisicionAlambres: state.adquisicionAlambres.filter( (adquisicionAlambre: AdquisicionAlambre) =>
      adquisicionAlambre.id !== props.idadquisicionAlambre
    ),
    message: null,
  })),
  on(deleteAdquisicionAlambreFailure, (state: AdquisicionAlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: AdquisicionAlambreState | undefined, action: Action): any {
  return adquisicionAlambreReducer(state, action);
}
