import {createAction, props} from '@ngrx/store';
import {Gavion} from '../../models/gavion';
import {Paginate} from '../../models/paginate';

export const irVistaGavion = createAction(
  '[Gavion] Ir a una vista de gaviones',
  props<{ location: string }>()
);

export const getGaviones = createAction(
  '[Gavion] Lista de Gaviones'
);

export const getGavionesSuccess = createAction(
  '[Gavion] Lista de Gaviones Success',
  props<{ gaviones: Gavion[] }>()
);

export const getGavionesFailure = createAction(
  '[Gavion] Lista de Gaviones Failure',
  props<{ error: any }>()
);

export const paginateGaviones = createAction(
  '[Gavion] Paginacion de Gaviones',
  props<{ items: number, page: number }>()
);

export const paginateGavionesSuccess = createAction(
  '[Gavion] Paginacion de Gaviones Success',
  props<{ gaviones: Gavion[], paginacion: Paginate }>()
);

export const paginateGavionesFailure = createAction(
  '[Gavion] Paginacion de Gaviones Failure',
  props<{ error: any }>()
);

export const storeGavion = createAction(
  '[Gavion] Store Gavion',
  props<{ gavion: Gavion | any }>()
);

export const storeGavionSuccess = createAction(
  '[Gavion] Store Gavion Success',
  props<{ gavion: Gavion }>()
);

export const storeGavionFailure = createAction(
  '[Gavion] Store Gavion Failure',
  props<{ error: any }>()
);

export const editGavion = createAction(
  '[Gavion] Edit Gavion',
  props<{ gavion: Gavion }>()
);

export const updateGavion = createAction(
  '[Gavion] Update Gavion',
  props<{ gavion: Gavion | any }>()
);

export const updateGavionSuccess = createAction(
  '[Gavion] Update Gavion Success',
  props<{ gavion: Gavion }>()
);

export const updateGavionFailure = createAction(
  '[Gavion] Update Gavion Failure',
  props<{ error: any }>()
);

export const deleteGavion = createAction(
  '[Gavion] Delete Gavion',
  props<{ idgavion: number }>()
);

export const deleteGavionSuccess = createAction(
  '[Gavion] Delete Gavion Success',
  props<{ idgavion: number }>()
);

export const deleteGavionFailure = createAction(
  '[Gavion] Delete Gavion Failure',
  props<{ error: any }>()
);
