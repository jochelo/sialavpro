import {Action, createReducer, on} from '@ngrx/store';
import {Cajaclavo} from '../../models/cajaclavo';
import {Paginate} from '../../models/paginate';
import {
  deleteCajaclavo, deleteCajaclavoFailure, deleteCajaclavoSuccess,
  editCajaclavo,
  irVistaCajaclavo,
  paginateCajaclavos,
  paginateCajaclavosFailure,
  paginateCajaclavosSuccess,
  storeCajaclavo,
  storeCajaclavoFailure,
  storeCajaclavoSuccess, updateCajaclavo, updateCajaclavoFailure, updateCajaclavoSuccess
} from '../actions/cajaclavo.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const cajaclavoFeatureKey = 'cajaclavo';

export interface CajaclavoState {
  cajaclavo: Cajaclavo;
  cajaclavos: Cajaclavo[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: CajaclavoState = {
  cajaclavo: null,
  cajaclavos: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const cajaclavoReducer = createReducer(
  initialState,
  on(irVistaCajaclavo, (state: CajaclavoState, props) => ({
    ...state,
    location: props.location
  })),
  on(paginateCajaclavos, (state: CajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Cajas de clavos',
  })),
  on(paginateCajaclavosSuccess, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    cajaclavos: props.cajaclavos,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateCajaclavosFailure, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeCajaclavo, (state: CajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Caja de clavos'
  })),
  on(storeCajaclavoSuccess, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    cajaclavos: [...state.cajaclavos, props.cajaclavo],
    message: null,
  })),
  on(storeCajaclavoFailure, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editCajaclavo, (state: CajaclavoState, props) => ({
    ...state,
    cajaclavo: props.cajaclavo,
    location: 'edit'
  })),
  on(updateCajaclavo, (state: CajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Caja de clavos'
  })),
  on(updateCajaclavoSuccess, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    cajaclavos: state.cajaclavos.map( (cajaclavo: Cajaclavo) => {
      if (cajaclavo.id === props.cajaclavo.id) {
        return props.cajaclavo;
      }
      return cajaclavo;
    }),
    message: null,
  })),
  on(updateCajaclavoFailure, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteCajaclavo, (state: CajaclavoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Caja de clavos'
  })),
  on(deleteCajaclavoSuccess, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    cajaclavos: state.cajaclavos.filter( (cajaclavo: Cajaclavo) => cajaclavo.id !== props.idcajaclavo),
    message: null,
  })),
  on(deleteCajaclavoFailure, (state: CajaclavoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: CajaclavoState | undefined, action: Action): any {
  return cajaclavoReducer(state, action);
}
