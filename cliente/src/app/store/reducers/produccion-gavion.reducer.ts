import {Action, createReducer, on} from '@ngrx/store';
import {ProduccionGavion} from '../../models/produccion-gavion';
import {Paginate} from '../../models/paginate';
import {
  deleteProduccionGavion,
  deleteProduccionGavionFailure,
  deleteProduccionGavionSuccess,
  editProduccionGavion,
  irVistaProduccionGavion,
  paginateProduccionGaviones,
  paginateProduccionGavionesFailure,
  paginateProduccionGavionesSuccess,
  storeProduccionGavionGrupal,
  storeProduccionGavionGrupalFailure,
  storeProduccionGavionGrupalSuccess,
  storeProduccionGavionIndividual,
  storeProduccionGavionIndividualFailure,
  storeProduccionGavionIndividualSuccess,
  storeProduccionGavionSinCupo,
  storeProduccionGavionSinCupoFailure,
  storeProduccionGavionSinCupoSuccess,
  updateProduccionGavion,
  updateProduccionGavionFailure,
  updateProduccionGavionSuccess
} from '../actions/produccion-gavion.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const produccionGavionFeatureKey = 'produccionGavion';

export interface ProduccionGavionState {
  produccionGavion: ProduccionGavion;
  produccionGaviones: ProduccionGavion[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: ProduccionGavionState = {
  produccionGavion: null,
  produccionGaviones: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const produccionGavionReducer = createReducer(
  initialState,
  on(irVistaProduccionGavion, (state: ProduccionGavionState, props) => ({
    ...state,
    location: props.location
  })),
  on(paginateProduccionGaviones, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Producción de Gaviones',
  })),
  on(paginateProduccionGavionesSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    produccionGaviones: props.produccionGaviones,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateProduccionGavionesFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionGavionIndividual, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Gavion Individual'
  })),
  on(storeProduccionGavionIndividualSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionGaviones: props.produccionGaviones,
    message: null,
  })),
  on(storeProduccionGavionIndividualFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionGavionGrupal, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Gavion Grupal'
  })),
  on(storeProduccionGavionGrupalSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionGaviones: props.produccionGaviones,
    message: null,
  })),
  on(storeProduccionGavionGrupalFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeProduccionGavionSinCupo, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Producción de Gavion Sin Cupo'
  })),
  on(storeProduccionGavionSinCupoSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionGaviones: props.produccionGaviones,
    message: null,
  })),
  on(storeProduccionGavionSinCupoFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editProduccionGavion, (state: ProduccionGavionState, props) => ({
    ...state,
    produccionGavion: props.produccionGavion,
    location: 'edit'
  })),
  on(updateProduccionGavion, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Producción de Gavion'
  })),
  on(updateProduccionGavionSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    produccionGaviones: state.produccionGaviones.map((produccionGavion: ProduccionGavion) => {
      if (produccionGavion.id === props.produccionGavion.id) {
        return props.produccionGavion;
      }
      return produccionGavion;
    }),
    message: null,
  })),
  on(updateProduccionGavionFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteProduccionGavion, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Producción de Gavion'
  })),
  on(deleteProduccionGavionSuccess, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    produccionGaviones: state.produccionGaviones.filter((produccionGavion: ProduccionGavion) => produccionGavion.id !== props.idproduccionGavion),
    message: null,
  })),
  on(deleteProduccionGavionFailure, (state: ProduccionGavionState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: ProduccionGavionState | undefined, action: Action): any {
  return produccionGavionReducer(state, action);
}
