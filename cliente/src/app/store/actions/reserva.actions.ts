import {createAction, props} from '@ngrx/store';
import {Reserva} from '../../models/reserva';
import {Paginate} from '../../models/paginate';

export const irVistaReserva = createAction(
  '[Reserva] Ir a una vista de reservas',
  props<{ location: string }>()
);

export const paginateReservas = createAction(
  '[Reserva] Paginacion de Reservas',
  props<{ items: number, page: number }>()
);

export const paginateReservasSuccess = createAction(
  '[Reserva] Paginacion de Reservas Success',
  props<{ reservas: Reserva[], paginacion: Paginate }>()
);

export const paginateReservasFailure = createAction(
  '[Reserva] Paginacion de Reservas Failure',
  props<{ error: any }>()
);

export const storeReserva = createAction(
  '[Reserva] Store Reserva',
  props<{ reserva: Reserva | any }>()
);

export const storeReservaSuccess = createAction(
  '[Reserva] Store Reserva Success',
  props<{ reserva: Reserva }>()
);

export const storeReservaFailure = createAction(
  '[Reserva] Store Reserva Failure',
  props<{ error: any }>()
);

export const editReserva = createAction(
  '[Reserva] Edit Reserva',
  props<{ reserva: Reserva }>()
);

export const updateReserva = createAction(
  '[Reserva] Update Reserva',
  props<{ reserva: Reserva | any }>()
);

export const updateReservaSuccess = createAction(
  '[Reserva] Update Reserva Success',
  props<{ reserva: Reserva }>()
);

export const updateReservaFailure = createAction(
  '[Reserva] Update Reserva Failure',
  props<{ error: any }>()
);

export const recepcionarReserva = createAction(
  '[Reserva] Recepcionar Reserva',
  props<{ idreserva: number, recepcionado: boolean }>()
);

export const recepcionarReservaSuccess = createAction(
  '[Reserva] Recepcionar Reserva Success',
  props<{ reserva: Reserva }>()
);

export const recepcionarReservaFailure = createAction(
  '[Reserva] Recepcionar Reserva Failure',
  props<{ error: any }>()
);

export const deleteReserva = createAction(
  '[Reserva] Delete Reserva',
  props<{ idreserva: number }>()
);

export const deleteReservaSuccess = createAction(
  '[Reserva] Delete Reserva Success',
  props<{ idreserva: number }>()
);

export const deleteReservaFailure = createAction(
  '[Reserva] Delete Reserva Failure',
  props<{ error: any }>()
);
