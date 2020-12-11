import {createAction, props} from '@ngrx/store';
import {Malla} from '../../models/malla';
import {Paginate} from '../../models/paginate';

export const irVistaMalla = createAction(
  '[Malla] Ir a una vista de mallas',
  props<{ location: string }>()
);

export const getMallas = createAction(
  '[Malla] Lista de Mallas'
);

export const getMallasSuccess = createAction(
  '[Malla] Lista de Mallas Success',
  props<{ mallas: Malla[] }>()
);

export const getMallasFailure = createAction(
  '[Malla] Lista de Mallas Failure',
  props<{ error: any }>()
);

export const paginateMallas = createAction(
  '[Malla] Paginacion de Mallas',
  props<{ items: number, page: number }>()
);

export const paginateMallasSuccess = createAction(
  '[Malla] Paginacion de Mallas Success',
  props<{ mallas: Malla[], paginacion: Paginate }>()
);

export const paginateMallasFailure = createAction(
  '[Malla] Paginacion de Mallas Failure',
  props<{ error: any }>()
);

export const storeMalla = createAction(
  '[Malla] Store Malla',
  props<{ malla: Malla | any }>()
);

export const storeMallaSuccess = createAction(
  '[Malla] Store Malla Success',
  props<{ malla: Malla }>()
);

export const storeMallaFailure = createAction(
  '[Malla] Store Malla Failure',
  props<{ error: any }>()
);

export const editMalla = createAction(
  '[Malla] Edit Malla',
  props<{ malla: Malla }>()
);

export const updateMalla = createAction(
  '[Malla] Update Malla',
  props<{ malla: Malla | any }>()
);

export const updateMallaSuccess = createAction(
  '[Malla] Update Malla Success',
  props<{ malla: Malla }>()
);

export const updateMallaFailure = createAction(
  '[Malla] Update Malla Failure',
  props<{ error: any }>()
);

export const deleteMalla = createAction(
  '[Malla] Delete Malla',
  props<{ idmalla: number }>()
);

export const deleteMallaSuccess = createAction(
  '[Malla] Delete Malla Success',
  props<{ idmalla: number }>()
);

export const deleteMallaFailure = createAction(
  '[Malla] Delete Malla Failure',
  props<{ error: any }>()
);
