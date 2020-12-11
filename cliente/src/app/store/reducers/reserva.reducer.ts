import {Action, createReducer, on} from '@ngrx/store';
import {Reserva} from '../../models/reserva';
import {Paginate} from '../../models/paginate';
import {
  deleteReserva, deleteReservaFailure, deleteReservaSuccess,
  editReserva,
  irVistaReserva,
  paginateReservas,
  paginateReservasFailure,
  paginateReservasSuccess, recepcionarReserva, recepcionarReservaFailure, recepcionarReservaSuccess,
  storeReserva,
  storeReservaFailure,
  storeReservaSuccess, updateReserva, updateReservaFailure, updateReservaSuccess
} from '../actions/reserva.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const reservaFeatureKey = 'reserva';

export interface ReservaState {
  reserva: Reserva;
  reservas: Reserva[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: any;
}

export const initialState: ReservaState = {
  reserva: null,
  reservas: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const reservaReducer = createReducer(
  initialState,
  on(irVistaReserva, (state: ReservaState, props) => ({
    ...state,
    location: props.location
  })),
  on(paginateReservas, (state: ReservaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Reservas',
  })),
  on(paginateReservasSuccess, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    reservas: props.reservas,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateReservasFailure, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeReserva, (state: ReservaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Reserva'
  })),
  on(storeReservaSuccess, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    // reservas: [...state.reservas, props.reserva],
    message: null,
    error: null
  })),
  on(storeReservaFailure, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editReserva, (state: ReservaState, props) => ({
    ...state,
    reserva: props.reserva,
    location: 'edit'
  })),
  on(updateReserva, (state: ReservaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Reserva'
  })),
  on(updateReservaSuccess, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    reservas: state.reservas.map( (reserva: Reserva) => {
      if (reserva.id === props.reserva.id) {
        return props.reserva;
      }
      return reserva;
    }),
    message: null,
    error: null
  })),
  on(updateReservaFailure, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(recepcionarReserva, (state: ReservaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Recepción de Reserva'
  })),
  on(recepcionarReservaSuccess, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    reservas: state.reservas.map( (reserva: Reserva) => {
      if (reserva.id === props.reserva.id) {
        return props.reserva;
      }
      return reserva;
    }),
    message: null,
    error: null
  })),
  on(recepcionarReservaFailure, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteReserva, (state: ReservaState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Reserva'
  })),
  on(deleteReservaSuccess, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    reservas: state.reservas.filter( (reserva: Reserva) => reserva.id !== props.idreserva),
    message: null,
  })),
  on(deleteReservaFailure, (state: ReservaState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: ReservaState | undefined, action: Action): any {
  return reservaReducer(state, action);
}
