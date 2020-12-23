import {Action, createReducer, on} from '@ngrx/store';
import {AdquisicionCajaclavo} from '../../models/adquisicion-cajaclavo';
import {Paginate} from '../../models/paginate';
import {
  deleteAdquisicionCajaclavo, deleteAdquisicionCajaclavoFailure, deleteAdquisicionCajaclavoSuccess,
  editAdquisicionCajaclavo, getAdquisicionCajaclavos, getAdquisicionCajaclavosFailure, getAdquisicionCajaclavosSuccess,
  irVistaAdquisicionCajaclavo,
  paginateAdquisicionCajaclavos,
  paginateAdquisicionCajaclavosFailure,
  paginateAdquisicionCajaclavosSuccess,
  storeAdquisicionCajaclavo,
  storeAdquisicionCajaclavoFailure,
  storeAdquisicionCajaclavoSuccess, updateAdquisicionCajaclavo, updateAdquisicionCajaclavoFailure, updateAdquisicionCajaclavoSuccess
} from '../actions/adquisicion-cajaclavo.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const adquisicionCajaclavoFeatureKey = 'adquisicion-cajaclavo';

export interface AdquisicionCajaclavoState {
  adquisicionCajaclavo: AdquisicionCajaclavo;
  adquisicionCajaclavos: AdquisicionCajaclavo[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: AdquisicionCajaclavoState = {
  adquisicionCajaclavo: null,
  adquisicionCajaclavos: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const adquisicionCajaclavoReducer = createReducer(
  initialState,
  on(irVistaAdquisicionCajaclavo, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    location: props.location
  })),
  on(getAdquisicionCajaclavos, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de AdquisicionCajaclavos',
  })),
  on(getAdquisicionCajaclavosSuccess, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    adquisicionCajaclavos: props.adquisicionCajaclavos,
    message: null
  })),
  on(getAdquisicionCajaclavosFailure, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateAdquisicionCajaclavos, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de AdquisicionCajaclavos',
  })),
  on(paginateAdquisicionCajaclavosSuccess, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    adquisicionCajaclavos: props.adquisicionCajaclavos,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateAdquisicionCajaclavosFailure, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeAdquisicionCajaclavo, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando AdquisicionCajaclavo'
  })),
  on(storeAdquisicionCajaclavoSuccess, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    adquisicionCajaclavos: [...state.adquisicionCajaclavos, props.adquisicionCajaclavo],
    message: null,
  })),
  on(storeAdquisicionCajaclavoFailure, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editAdquisicionCajaclavo, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    adquisicionCajaclavo: props.adquisicionCajaclavo,
    location: 'edit'
  })),
  on(updateAdquisicionCajaclavo, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando AdquisicionCajaclavo'
  })),
  on(updateAdquisicionCajaclavoSuccess, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    adquisicionCajaclavos: state.adquisicionCajaclavos.map( (adquisicionCajaclavo: AdquisicionCajaclavo) => {
      if (adquisicionCajaclavo.id === props.adquisicionCajaclavo.id) {
        return props.adquisicionCajaclavo;
      }
      return adquisicionCajaclavo;
    }),
    message: null,
  })),
  on(updateAdquisicionCajaclavoFailure, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteAdquisicionCajaclavo, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando AdquisicionCajaclavo'
  })),
  on(deleteAdquisicionCajaclavoSuccess, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    adquisicionCajaclavos: state.adquisicionCajaclavos.filter( (adquisicionCajaclavo: AdquisicionCajaclavo) =>
      adquisicionCajaclavo.id !== props.idadquisicionCajaclavo
    ),
    message: null,
  })),
  on(deleteAdquisicionCajaclavoFailure, (state: AdquisicionCajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: AdquisicionCajaclavoState | undefined, action: Action): any {
  return adquisicionCajaclavoReducer(state, action);
}
