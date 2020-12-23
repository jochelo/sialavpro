import {createAction, props} from '@ngrx/store';
import {Pedido} from '../../models/pedido';
import {Paginate} from '../../models/paginate';

export const irVistaPedido = createAction(
  '[Pedido] Ir a una vista de pedidos',
  props<{ location: string }>()
);

export const getPedidos = createAction(
  '[Pedido] Lista de Pedidos'
);

export const getPedidosSuccess = createAction(
  '[Pedido] Lista de Pedidos Success',
  props<{ pedidos: Pedido[] }>()
);

export const getPedidosFailure = createAction(
  '[Pedido] Lista de Pedidos Failure',
  props<{ error: any }>()
);

export const paginatePedidos = createAction(
  '[Pedido] Paginacion de Pedidos',
  props<{ items: number, page: number }>()
);

export const paginatePedidosSuccess = createAction(
  '[Pedido] Paginacion de Pedidos Success',
  props<{ pedidos: Pedido[], paginacion: Paginate }>()
);

export const paginatePedidosFailure = createAction(
  '[Pedido] Paginacion de Pedidos Failure',
  props<{ error: any }>()
);

export const storePedido = createAction(
  '[Pedido] Store Pedido',
  props<{ data: any }>()
);

export const storePedidoSuccess = createAction(
  '[Pedido] Store Pedido Success',
  props<{ pedido: Pedido }>()
);

export const storePedidoFailure = createAction(
  '[Pedido] Store Pedido Failure',
  props<{ error: any }>()
);

export const editPedido = createAction(
  '[Pedido] Edit Pedido',
  props<{ pedido: Pedido }>()
);

export const updatePedido = createAction(
  '[Pedido] Update Pedido',
  props<{ pedido: Pedido | any }>()
);

export const updatePedidoSuccess = createAction(
  '[Pedido] Update Pedido Success',
  props<{ pedido: Pedido }>()
);

export const updatePedidoFailure = createAction(
  '[Pedido] Update Pedido Failure',
  props<{ error: any }>()
);

export const updateImportePedido = createAction(
  '[Pedido] Update Importe Pedido',
  props<{ data: any }>()
);

export const updateImportePedidoSuccess = createAction(
  '[Pedido] Update Importe Pedido Success',
  props<{ pedido: Pedido }>()
);

export const updateImportePedidoFailure = createAction(
  '[Pedido] Update Importe Pedido Failure',
  props<{ error: any }>()
);

export const deletePedido = createAction(
  '[Pedido] Delete Pedido',
  props<{ idpedido: number }>()
);

export const deletePedidoSuccess = createAction(
  '[Pedido] Delete Pedido Success',
  props<{ idpedido: number }>()
);

export const deletePedidoFailure = createAction(
  '[Pedido] Delete Pedido Failure',
  props<{ error: any }>()
);
