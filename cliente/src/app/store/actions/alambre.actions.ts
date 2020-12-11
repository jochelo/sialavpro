import {createAction, props} from '@ngrx/store';
import {Alambre} from '../../models/alambre';
import {Paginate} from '../../models/paginate';

export const irVistaAlambre = createAction(
  '[Alambre] Ir a una vista de alambres',
  props<{ location: string }>()
);

export const paginateAlambres = createAction(
  '[Alambre] Paginacion de Alambres',
  props<{ items: number, page: number }>()
);

export const paginateAlambresSuccess = createAction(
  '[Alambre] Paginacion de Alambres Success',
  props<{ alambres: Alambre[], paginacion: Paginate }>()
);

export const paginateAlambresFailure = createAction(
  '[Alambre] Paginacion de Alambres Failure',
  props<{ error: any }>()
);

export const storeAlambre = createAction(
  '[Alambre] Store Alambre',
  props<{ alambre: Alambre | any }>()
);

export const storeAlambreSuccess = createAction(
  '[Alambre] Store Alambre Success',
  props<{ alambre: Alambre }>()
);

export const storeAlambreFailure = createAction(
  '[Alambre] Store Alambre Failure',
  props<{ error: any }>()
);

export const editAlambre = createAction(
  '[Alambre] Edit Alambre',
  props<{ alambre: Alambre }>()
);

export const updateAlambre = createAction(
  '[Alambre] Update Alambre',
  props<{ alambre: Alambre | any }>()
);

export const updateAlambreSuccess = createAction(
  '[Alambre] Update Alambre Success',
  props<{ alambre: Alambre }>()
);

export const updateAlambreFailure = createAction(
  '[Alambre] Update Alambre Failure',
  props<{ error: any }>()
);

export const deleteAlambre = createAction(
  '[Alambre] Delete Alambre',
  props<{ idalambre: number }>()
);

export const deleteAlambreSuccess = createAction(
  '[Alambre] Delete Alambre Success',
  props<{ idalambre: number }>()
);

export const deleteAlambreFailure = createAction(
  '[Alambre] Delete Alambre Failure',
  props<{ error: any }>()
);
