import {createAction, props} from '@ngrx/store';
import {AdquisicionCajaclavo} from '../../models/adquisicion-cajaclavo';
import {Paginate} from '../../models/paginate';

export const irVistaAdquisicionCajaclavo = createAction(
  '[AdquisicionCajaclavo] Ir a una vista de adquisicionCajaclavos',
  props<{ location: string }>()
);

export const getAdquisicionCajaclavos = createAction(
  '[AdquisicionCajaclavo] Lista de AdquisicionCajaclavos'
);

export const getAdquisicionCajaclavosSuccess = createAction(
  '[AdquisicionCajaclavo] Lista de AdquisicionCajaclavos Success',
  props<{ adquisicionCajaclavos: AdquisicionCajaclavo[] }>()
);

export const getAdquisicionCajaclavosFailure = createAction(
  '[AdquisicionCajaclavo] Lista de AdquisicionCajaclavos Failure',
  props<{ error: any }>()
);

export const paginateAdquisicionCajaclavos = createAction(
  '[AdquisicionCajaclavo] Paginacion de AdquisicionCajaclavos',
  props<{ items: number, page: number }>()
);

export const paginateAdquisicionCajaclavosSuccess = createAction(
  '[AdquisicionCajaclavo] Paginacion de AdquisicionCajaclavos Success',
  props<{ adquisicionCajaclavos: AdquisicionCajaclavo[], paginacion: Paginate }>()
);

export const paginateAdquisicionCajaclavosFailure = createAction(
  '[AdquisicionCajaclavo] Paginacion de AdquisicionCajaclavos Failure',
  props<{ error: any }>()
);

export const storeAdquisicionCajaclavo = createAction(
  '[AdquisicionCajaclavo] Store AdquisicionCajaclavo',
  props<{ adquisicionCajaclavo: AdquisicionCajaclavo | any }>()
);

export const storeAdquisicionCajaclavoSuccess = createAction(
  '[AdquisicionCajaclavo] Store AdquisicionCajaclavo Success',
  props<{ adquisicionCajaclavo: AdquisicionCajaclavo }>()
);

export const storeAdquisicionCajaclavoFailure = createAction(
  '[AdquisicionCajaclavo] Store AdquisicionCajaclavo Failure',
  props<{ error: any }>()
);

export const editAdquisicionCajaclavo = createAction(
  '[AdquisicionCajaclavo] Edit AdquisicionCajaclavo',
  props<{ adquisicionCajaclavo: AdquisicionCajaclavo }>()
);

export const updateAdquisicionCajaclavo = createAction(
  '[AdquisicionCajaclavo] Update AdquisicionCajaclavo',
  props<{ adquisicionCajaclavo: AdquisicionCajaclavo | any }>()
);

export const updateAdquisicionCajaclavoSuccess = createAction(
  '[AdquisicionCajaclavo] Update AdquisicionCajaclavo Success',
  props<{ adquisicionCajaclavo: AdquisicionCajaclavo }>()
);

export const updateAdquisicionCajaclavoFailure = createAction(
  '[AdquisicionCajaclavo] Update AdquisicionCajaclavo Failure',
  props<{ error: any }>()
);

export const deleteAdquisicionCajaclavo = createAction(
  '[AdquisicionCajaclavo] Delete AdquisicionCajaclavo',
  props<{ idadquisicionCajaclavo: number }>()
);

export const deleteAdquisicionCajaclavoSuccess = createAction(
  '[AdquisicionCajaclavo] Delete AdquisicionCajaclavo Success',
  props<{ idadquisicionCajaclavo: number }>()
);

export const deleteAdquisicionCajaclavoFailure = createAction(
  '[AdquisicionCajaclavo] Delete AdquisicionCajaclavo Failure',
  props<{ error: any }>()
);
