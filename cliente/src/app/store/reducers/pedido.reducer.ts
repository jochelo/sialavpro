import {Action, createReducer, on} from '@ngrx/store';
import {Pedido} from '../../models/pedido';
import {Paginate} from '../../models/paginate';
import {
  deletePedido,
  deletePedidoFailure,
  deletePedidoSuccess,
  editPedido,
  getPedidos,
  getPedidosFailure,
  getPedidosSuccess,
  irVistaPedido,
  paginatePedidos,
  paginatePedidosFailure,
  paginatePedidosSuccess,
  storePedido,
  storePedidoFailure,
  storePedidoSuccess,
  updateImportePedido,
  updateImportePedidoFailure,
  updateImportePedidoSuccess,
  updatePedido,
  updatePedidoFailure,
  updatePedidoSuccess
} from '../actions/pedido.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const pedidoFeatureKey = 'pedido';

export interface PedidoState {
  pedido: Pedido;
  pedidos: Pedido[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: PedidoState = {
  pedido: null,
  pedidos: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const pedidoReducer = createReducer(
  initialState,
  on(irVistaPedido, (state: PedidoState, props) => ({
    ...state,
    location: props.location,
    error: null
  })),
  on(getPedidos, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Pedidos',
  })),
  on(getPedidosSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    pedidos: props.pedidos,
    error: null,
    message: null,
  })),
  on(getPedidosFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginatePedidos, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Pedidos',
  })),
  on(paginatePedidosSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    pedidos: props.pedidos,
    paginacion: props.paginacion,
    message: null,
    error: null
  })),
  on(paginatePedidosFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storePedido, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Pedido'
  })),
  on(storePedidoSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    pedidos: [...state.pedidos, props.pedido],
    pedido: props.pedido,
    message: null,
    error: null
  })),
  on(storePedidoFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editPedido, (state: PedidoState, props) => ({
    ...state,
    pedido: props.pedido,
    location: 'edit',
    error: null
  })),
  on(updatePedido, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Pedido'
  })),
  on(updatePedidoSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    pedidos: state.pedidos.map( (pedido: Pedido) => {
      if (pedido.id === props.pedido.id) {
        return props.pedido;
      }
      return pedido;
    }),
    message: null,
    error: null
  })),
  on(updatePedidoFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(updateImportePedido, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Nuevo Importe Pedido'
  })),
  on(updateImportePedidoSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    pedidos: state.pedidos.map( (pedido: Pedido) => {
      if (pedido.id === props.pedido.id) {
        return props.pedido;
      }
      return pedido;
    }),
    message: null,
    error: null
  })),
  on(updateImportePedidoFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deletePedido, (state: PedidoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Pedido'
  })),
  on(deletePedidoSuccess, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    pedidos: state.pedidos.filter( (pedido: Pedido) => pedido.id !== props.idpedido),
    message: null,
    error: null
  })),
  on(deletePedidoFailure, (state: PedidoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: PedidoState | undefined, action: Action): any {
  return pedidoReducer(state, action);
}
