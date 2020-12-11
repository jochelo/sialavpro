import {Action, createReducer, on} from '@ngrx/store';
import {ProduccionMalla} from '../../models/produccion-malla';
import {Paginate} from '../../models/paginate';
import {
  deleteProduccionMalla,
  deleteProduccionMallaFailure,
  deleteProduccionMallaSuccess,
  editProduccionMalla,
  irVistaProduccionMalla,
  paginateProduccionMallas,
  paginateProduccionMallasFailure,
  paginateProduccionMallasSuccess,
  storeProduccionMallaGrupal,
  storeProduccionMallaGrupalFailure,
  storeProduccionMallaGrupalSuccess,
  storeProduccionMallaIndividual,
  storeProduccionMallaIndividualFailure,
  storeProduccionMallaIndividualSuccess,
  storeProduccionMallaSinCupo,
  storeProduccionMallaSinCupoFailure,
  storeProduccionMallaSinCupoSuccess,
  updateProduccionMalla,
  updateProduccionMallaFailure,
  updateProduccionMallaSuccess
} from '../actions/produccion-malla.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const produccionMallaFeatureKey = 'produccionMalla';

export interface ProduccionMallaState {
  produccionMalla: ProduccionMalla;
  produccionMallas: ProduccionMalla[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: ProduccionMallaState = {
  produccionMalla: null,
  produccionMallas: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const produccionMallaReducer = createReducer(
  initialState,
  on(irVistaProduccionMalla, (state: ProduccionMallaState, props) => ({
    ...state,
    location: props.location
  })),
  on(paginateProduccionMallas, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Producción de Mallas',
  })),
  on(paginateProduccionMallasSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    produccionMallas: props.produccionMallas,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateProduccionMallasFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionMallaIndividual, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Malla Individual'
  })),
  on(storeProduccionMallaIndividualSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionMallas: props.produccionMallas,
    message: null,
  })),
  on(storeProduccionMallaIndividualFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionMallaGrupal, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Malla Grupal'
  })),
  on(storeProduccionMallaGrupalSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionMallas: props.produccionMallas,
    message: null,
  })),
  on(storeProduccionMallaGrupalFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionMallaSinCupo, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Malla Sin Cupo'
  })),
  on(storeProduccionMallaSinCupoSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionMallas: props.produccionMallas,
    message: null,
  })),
  on(storeProduccionMallaSinCupoFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editProduccionMalla, (state: ProduccionMallaState, props) => ({
    ...state,
    produccionMalla: props.produccionMalla,
    location: 'edit'
  })),
  on(updateProduccionMalla, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Producción de Malla'
  })),
  on(updateProduccionMallaSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionMallas: state.produccionMallas.map((produccionMalla: ProduccionMalla) => {
      if (produccionMalla.id === props.produccionMalla.id) {
        return props.produccionMalla;
      }
      return produccionMalla;
    }),
    message: null,
  })),
  on(updateProduccionMallaFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteProduccionMalla, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Producción de Malla'
  })),
  on(deleteProduccionMallaSuccess, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    produccionMallas: state.produccionMallas.filter((produccionMalla: ProduccionMalla) => produccionMalla.id !== props.idproduccionMalla),
    message: null,
  })),
  on(deleteProduccionMallaFailure, (state: ProduccionMallaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: ProduccionMallaState | undefined, action: Action): any {
  return produccionMallaReducer(state, action);
}
