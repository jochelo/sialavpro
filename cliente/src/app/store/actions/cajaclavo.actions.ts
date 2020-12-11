import {createAction, props} from '@ngrx/store';
import {Cajaclavo} from '../../models/cajaclavo';
import {Paginate} from '../../models/paginate';

export const irVistaCajaclavo = createAction(
  '[Cajaclavo] Ir a una vista de cajaclavos',
  props<{ location: string }>()
);

export const paginateCajaclavos = createAction(
  '[Cajaclavo] Paginacion de Cajaclavos',
  props<{ items: number, page: number }>()
);

export const paginateCajaclavosSuccess = createAction(
  '[Cajaclavo] Paginacion de Cajaclavos Success',
  props<{ cajaclavos: Cajaclavo[], paginacion: Paginate }>()
);

export const paginateCajaclavosFailure = createAction(
  '[Cajaclavo] Paginacion de Cajaclavos Failure',
  props<{ error: any }>()
);

export const storeCajaclavo = createAction(
  '[Cajaclavo] Store Cajaclavo',
  props<{ cajaclavo: Cajaclavo | any }>()
);

export const storeCajaclavoSuccess = createAction(
  '[Cajaclavo] Store Cajaclavo Success',
  props<{ cajaclavo: Cajaclavo }>()
);

export const storeCajaclavoFailure = createAction(
  '[Cajaclavo] Store Cajaclavo Failure',
  props<{ error: any }>()
);

export const editCajaclavo = createAction(
  '[Cajaclavo] Edit Cajaclavo',
  props<{ cajaclavo: Cajaclavo }>()
);

export const updateCajaclavo = createAction(
  '[Cajaclavo] Update Cajaclavo',
  props<{ cajaclavo: Cajaclavo | any }>()
);

export const updateCajaclavoSuccess = createAction(
  '[Cajaclavo] Update Cajaclavo Success',
  props<{ cajaclavo: Cajaclavo }>()
);

export const updateCajaclavoFailure = createAction(
  '[Cajaclavo] Update Cajaclavo Failure',
  props<{ error: any }>()
);

export const deleteCajaclavo = createAction(
  '[Cajaclavo] Delete Cajaclavo',
  props<{ idcajaclavo: number }>()
);

export const deleteCajaclavoSuccess = createAction(
  '[Cajaclavo] Delete Cajaclavo Success',
  props<{ idcajaclavo: number }>()
);

export const deleteCajaclavoFailure = createAction(
  '[Cajaclavo] Delete Cajaclavo Failure',
  props<{ error: any }>()
);
