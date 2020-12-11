import {Action, createReducer, on} from '@ngrx/store';
import {Cliente} from '../../models/cliente';
import {Paginate} from '../../models/paginate';
import {
  deleteCliente, deleteClienteFailure, deleteClienteSuccess,
  editCliente,
  irVistaCliente,
  paginateClientes,
  paginateClientesFailure,
  paginateClientesSuccess,
  storeCliente,
  storeClienteFailure,
  storeClienteSuccess, updateCliente, updateClienteFailure, updateClienteSuccess
} from '../actions/cliente.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const clienteFeatureKey = 'cliente';

export interface ClienteState {
  cliente: Cliente;
  clientes: Cliente[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: ClienteState = {
  cliente: null,
  clientes: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const clienteReducer = createReducer(
  initialState,
  on(irVistaCliente, (state: ClienteState, props) => ({
    ...state,
    location: props.location
  })),
  on(paginateClientes, (state: ClienteState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Clientes',
  })),
  on(paginateClientesSuccess, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    clientes: props.clientes,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateClientesFailure, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeCliente, (state: ClienteState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Cliente'
  })),
  on(storeClienteSuccess, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    clientes: [...state.clientes, props.cliente],
    message: null,
  })),
  on(storeClienteFailure, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editCliente, (state: ClienteState, props) => ({
    ...state,
    cliente: props.cliente,
    location: 'edit'
  })),
  on(updateCliente, (state: ClienteState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Cliente'
  })),
  on(updateClienteSuccess, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    clientes: state.clientes.map( (cliente: Cliente) => {
      if (cliente.id === props.cliente.id) {
        return props.cliente;
      }
      return cliente;
    }),
    message: null,
  })),
  on(updateClienteFailure, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteCliente, (state: ClienteState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Cliente'
  })),
  on(deleteClienteSuccess, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    clientes: state.clientes.filter( (cliente: Cliente) => cliente.id !== props.idcliente),
    message: null,
  })),
  on(deleteClienteFailure, (state: ClienteState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: ClienteState | undefined, action: Action): any {
  return clienteReducer(state, action);
}
