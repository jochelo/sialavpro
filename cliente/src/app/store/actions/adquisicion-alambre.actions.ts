import {createAction, props} from '@ngrx/store';
import {AdquisicionAlambre} from '../../models/adquisicion-alambre';
import {Paginate} from '../../models/paginate';

export const irVistaAdquisicionAlambre = createAction(
  '[AdquisicionAlambre] Ir a una vista de adquisicionAlambres',
  props<{ location: string }>()
);

export const getAdquisicionAlambres = createAction(
  '[AdquisicionAlambre] Lista de AdquisicionAlambres'
);

export const getAdquisicionAlambresSuccess = createAction(
  '[AdquisicionAlambre] Lista de AdquisicionAlambres Success',
  props<{ adquisicionAlambres: AdquisicionAlambre[] }>()
);

export const getAdquisicionAlambresFailure = createAction(
  '[AdquisicionAlambre] Lista de AdquisicionAlambres Failure',
  props<{ error: any }>()
);

export const paginateAdquisicionAlambres = createAction(
  '[AdquisicionAlambre] Paginacion de AdquisicionAlambres',
  props<{ items: number, page: number }>()
);

export const paginateAdquisicionAlambresSuccess = createAction(
  '[AdquisicionAlambre] Paginacion de AdquisicionAlambres Success',
  props<{ adquisicionAlambres: AdquisicionAlambre[], paginacion: Paginate }>()
);

export const paginateAdquisicionAlambresFailure = createAction(
  '[AdquisicionAlambre] Paginacion de AdquisicionAlambres Failure',
  props<{ error: any }>()
);

export const storeAdquisicionAlambre = createAction(
  '[AdquisicionAlambre] Store AdquisicionAlambre',
  props<{ adquisicionAlambre: AdquisicionAlambre | any }>()
);

export const storeAdquisicionAlambreSuccess = createAction(
  '[AdquisicionAlambre] Store AdquisicionAlambre Success',
  props<{ adquisicionAlambre: AdquisicionAlambre }>()
);

export const storeAdquisicionAlambreFailure = createAction(
  '[AdquisicionAlambre] Store AdquisicionAlambre Failure',
  props<{ error: any }>()
);

export const editAdquisicionAlambre = createAction(
  '[AdquisicionAlambre] Edit AdquisicionAlambre',
  props<{ adquisicionAlambre: AdquisicionAlambre }>()
);

export const updateAdquisicionAlambre = createAction(
  '[AdquisicionAlambre] Update AdquisicionAlambre',
  props<{ adquisicionAlambre: AdquisicionAlambre | any }>()
);

export const updateAdquisicionAlambreSuccess = createAction(
  '[AdquisicionAlambre] Update AdquisicionAlambre Success',
  props<{ adquisicionAlambre: AdquisicionAlambre }>()
);

export const updateAdquisicionAlambreFailure = createAction(
  '[AdquisicionAlambre] Update AdquisicionAlambre Failure',
  props<{ error: any }>()
);

export const deleteAdquisicionAlambre = createAction(
  '[AdquisicionAlambre] Delete AdquisicionAlambre',
  props<{ idadquisicionAlambre: number }>()
);

export const deleteAdquisicionAlambreSuccess = createAction(
  '[AdquisicionAlambre] Delete AdquisicionAlambre Success',
  props<{ idadquisicionAlambre: number }>()
);

export const deleteAdquisicionAlambreFailure = createAction(
  '[AdquisicionAlambre] Delete AdquisicionAlambre Failure',
  props<{ error: any }>()
);
