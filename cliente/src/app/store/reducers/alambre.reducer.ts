import {Action, createReducer, on} from '@ngrx/store';
import {Alambre} from '../../models/alambre';
import {Paginate} from '../../models/paginate';
import {
  deleteAlambre, deleteAlambreFailure, deleteAlambreSuccess,
  editAlambre, getAlambres, getAlambresFailure, getAlambresSuccess,
  irVistaAlambre,
  paginateAlambres,
  paginateAlambresFailure,
  paginateAlambresSuccess,
  storeAlambre,
  storeAlambreFailure,
  storeAlambreSuccess, updateAlambre, updateAlambreFailure, updateAlambreSuccess
} from '../actions/alambre.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const alambreFeatureKey = 'alambre';

export interface AlambreState {
  alambre: Alambre;
  alambres: Alambre[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: AlambreState = {
  alambre: null,
  alambres: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const alambreReducer = createReducer(
  initialState,
  on(irVistaAlambre, (state: AlambreState, props) => ({
    ...state,
    location: props.location
  })),
  on(getAlambres, (state: AlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Alambres',
  })),
  on(getAlambresSuccess, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    alambres: props.alambres,
    message: null
  })),
  on(getAlambresFailure, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateAlambres, (state: AlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Alambres',
  })),
  on(paginateAlambresSuccess, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    alambres: props.alambres,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateAlambresFailure, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeAlambre, (state: AlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Alambre'
  })),
  on(storeAlambreSuccess, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    alambres: [...state.alambres, props.alambre],
    alambre: props.alambre,
    message: null,
  })),
  on(storeAlambreFailure, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editAlambre, (state: AlambreState, props) => ({
    ...state,
    alambre: props.alambre,
    location: 'edit'
  })),
  on(updateAlambre, (state: AlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Alambre'
  })),
  on(updateAlambreSuccess, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    alambres: state.alambres.map( (alambre: Alambre) => {
      if (alambre.id === props.alambre.id) {
        return props.alambre;
      }
      return alambre;
    }),
    message: null,
  })),
  on(updateAlambreFailure, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteAlambre, (state: AlambreState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Alambre'
  })),
  on(deleteAlambreSuccess, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    alambres: state.alambres.filter( (alambre: Alambre) => alambre.id !== props.idalambre),
    message: null,
  })),
  on(deleteAlambreFailure, (state: AlambreState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: AlambreState | undefined, action: Action): any {
  return alambreReducer(state, action);
}
