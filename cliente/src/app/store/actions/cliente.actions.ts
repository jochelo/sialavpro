import {createAction, props} from '@ngrx/store';
import {Cliente} from '../../models/cliente';
import {Paginate} from '../../models/paginate';

export const irVistaCliente = createAction(
  '[Cliente] Ir a una vista de clientes',
  props<{ location: string }>()
);

export const getClientes = createAction(
  '[Cliente] Lista de Clientes'
);

export const getClientesSuccess = createAction(
  '[Cliente] Lista de Clientes Success',
  props<{ clientes: Cliente[] }>()
);

export const getClientesFailure = createAction(
  '[Cliente] Lista de Clientes Failure',
  props<{ error: any }>()
);

export const paginateClientes = createAction(
  '[Cliente] Paginacion de Clientes',
  props<{ items: number, page: number }>()
);

export const paginateClientesSuccess = createAction(
  '[Cliente] Paginacion de Clientes Success',
  props<{ clientes: Cliente[], paginacion: Paginate }>()
);

export const paginateClientesFailure = createAction(
  '[Cliente] Paginacion de Clientes Failure',
  props<{ error: any }>()
);

export const storeCliente = createAction(
  '[Cliente] Store Cliente',
  props<{ cliente: Cliente | any }>()
);

export const storeClienteSuccess = createAction(
  '[Cliente] Store Cliente Success',
  props<{ cliente: Cliente }>()
);

export const storeClienteFailure = createAction(
  '[Cliente] Store Cliente Failure',
  props<{ error: any }>()
);

export const showCliente = createAction(
  '[Cliente] Show Cliente',
  props<{ idcliente: number }>()
);

export const showClienteSuccess = createAction(
  '[Cliente] Show Cliente Success',
  props<{ cliente: Cliente }>()
);

export const showClienteFailure = createAction(
  '[Cliente] Show Cliente Failure',
  props<{ error: any }>()
);

export const resetCliente = createAction(
  '[Cliente] Reset Cliente'
);

export const editCliente = createAction(
  '[Cliente] Edit Cliente',
  props<{ cliente: Cliente }>()
);

export const updateCliente = createAction(
  '[Cliente] Update Cliente',
  props<{ cliente: Cliente | any }>()
);

export const updateClienteSuccess = createAction(
  '[Cliente] Update Cliente Success',
  props<{ cliente: Cliente }>()
);

export const updateClienteFailure = createAction(
  '[Cliente] Update Cliente Failure',
  props<{ error: any }>()
);

export const deleteCliente = createAction(
  '[Cliente] Delete Cliente',
  props<{ idcliente: number }>()
);

export const deleteClienteSuccess = createAction(
  '[Cliente] Delete Cliente Success',
  props<{ idcliente: number }>()
);

export const deleteClienteFailure = createAction(
  '[Cliente] Delete Cliente Failure',
  props<{ error: any }>()
);
