import {createAction, props} from '@ngrx/store';
import {ProduccionGavion} from '../../models/produccion-gavion';
import {Paginate} from '../../models/paginate';

export const irVistaProduccionGavion = createAction(
  '[ProduccionGavion] Ir a una vista de produccionGaviones',
  props<{ location: string }>()
);

export const paginateProduccionGaviones = createAction(
  '[ProduccionGavion] Paginacion de ProduccionGaviones',
  props<{ items: number, page: number, fecha: string }>()
);

export const paginateProduccionGavionesSuccess = createAction(
  '[ProduccionGavion] Paginacion de ProduccionGaviones Success',
  props<{ produccionGaviones: ProduccionGavion[], paginacion: Paginate }>()
);

export const paginateProduccionGavionesFailure = createAction(
  '[ProduccionGavion] Paginacion de ProduccionGaviones Failure',
  props<{ error: any }>()
);

export const storeProduccionGavionIndividual = createAction(
  '[ProduccionGavion] Store Produccion Gavion Individual',
  props<{ produccionGavion: ProduccionGavion | any }>()
);

export const storeProduccionGavionIndividualSuccess = createAction(
  '[ProduccionGavion] Store Produccion Gavion Individual Success',
  props<{ produccionGaviones: ProduccionGavion[] }>()
);

export const storeProduccionGavionIndividualFailure = createAction(
  '[ProduccionGavion] Store Produccion Gavion Individual Failure',
  props<{ error: any }>()
);

export const storeProduccionGavionGrupal = createAction(
  '[ProduccionGavion] Store Produccion Gavion Grupal',
  props<{ produccionGavion: ProduccionGavion | any }>()
);

export const storeProduccionGavionGrupalSuccess = createAction(
  '[ProduccionGavion] Store Produccion Gavion Grupal Success',
  props<{ produccionGaviones: ProduccionGavion[] }>()
);

export const storeProduccionGavionGrupalFailure = createAction(
  '[ProduccionGavion] Store Produccion Gavion Grupal Failure',
  props<{ error: any }>()
);

export const storeProduccionGavionSinCupo = createAction(
  '[ProduccionGavion] Store Produccion Gavion Sin Cupo',
  props<{ produccionGavion: ProduccionGavion | any }>()
);

export const storeProduccionGavionSinCupoSuccess = createAction(
  '[ProduccionGavion] Store Produccion Gavion Sin Cupo Success',
  props<{ produccionGaviones: ProduccionGavion[] }>()
);

export const storeProduccionGavionSinCupoFailure = createAction(
  '[ProduccionGavion] Store Produccion Gavion Sin Cupo Failure',
  props<{ error: any }>()
);

export const editProduccionGavion = createAction(
  '[ProduccionGavion] Edit ProduccionGavion',
  props<{ produccionGavion: ProduccionGavion }>()
);

export const updateProduccionGavion = createAction(
  '[ProduccionGavion] Update ProduccionGavion',
  props<{ produccionGavion: ProduccionGavion | any }>()
);

export const updateProduccionGavionSuccess = createAction(
  '[ProduccionGavion] Update ProduccionGavion Success',
  props<{ produccionGavion: ProduccionGavion }>()
);

export const updateProduccionGavionFailure = createAction(
  '[ProduccionGavion] Update ProduccionGavion Failure',
  props<{ error: any }>()
);

export const deleteProduccionGavion = createAction(
  '[ProduccionGavion] Delete ProduccionGavion',
  props<{ idproduccionGavion: number }>()
);

export const deleteProduccionGavionSuccess = createAction(
  '[ProduccionGavion] Delete ProduccionGavion Success',
  props<{ idproduccionGavion: number }>()
);

export const deleteProduccionGavionFailure = createAction(
  '[ProduccionGavion] Delete ProduccionGavion Failure',
  props<{ error: any }>()
);
