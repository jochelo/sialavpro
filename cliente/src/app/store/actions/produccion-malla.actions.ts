import {createAction, props} from '@ngrx/store';
import {ProduccionMalla} from '../../models/produccion-malla';
import {Paginate} from '../../models/paginate';

export const irVistaProduccionMalla = createAction(
  '[ProduccionMalla] Ir a una vista de produccionMallas',
  props<{ location: string }>()
);

export const paginateProduccionMallas = createAction(
  '[ProduccionMalla] Paginacion de ProduccionMallas',
  props<{ items: number, page: number, fecha: string }>()
);

export const paginateProduccionMallasSuccess = createAction(
  '[ProduccionMalla] Paginacion de ProduccionMallas Success',
  props<{ produccionMallas: ProduccionMalla[], paginacion: Paginate }>()
);

export const paginateProduccionMallasFailure = createAction(
  '[ProduccionMalla] Paginacion de ProduccionMallas Failure',
  props<{ error: any }>()
);

export const storeProduccionMallaIndividual = createAction(
  '[ProduccionMalla] Store Produccion Malla Individual',
  props<{ produccionMalla: ProduccionMalla | any }>()
);

export const storeProduccionMallaIndividualSuccess = createAction(
  '[ProduccionMalla] Store Produccion Malla Individual Success',
  props<{ produccionMallas: ProduccionMalla[] }>()
);

export const storeProduccionMallaIndividualFailure = createAction(
  '[ProduccionMalla] Store Produccion Malla Individual Failure',
  props<{ error: any }>()
);

export const storeProduccionMallaGrupal = createAction(
  '[ProduccionMalla] Store Produccion Malla Grupal',
  props<{ produccionMalla: ProduccionMalla | any }>()
);

export const storeProduccionMallaGrupalSuccess = createAction(
  '[ProduccionMalla] Store Produccion Malla Grupal Success',
  props<{ produccionMallas: ProduccionMalla[] }>()
);

export const storeProduccionMallaGrupalFailure = createAction(
  '[ProduccionMalla] Store Produccion Malla Grupal Failure',
  props<{ error: any }>()
);

export const storeProduccionMallaSinCupo = createAction(
  '[ProduccionMalla] Store Produccion Malla Sin Cupo',
  props<{ produccionMalla: ProduccionMalla | any }>()
);

export const storeProduccionMallaSinCupoSuccess = createAction(
  '[ProduccionMalla] Store Produccion Malla Sin Cupo Success',
  props<{ produccionMallas: ProduccionMalla[] }>()
);

export const storeProduccionMallaSinCupoFailure = createAction(
  '[ProduccionMalla] Store Produccion Malla Sin Cupo Failure',
  props<{ error: any }>()
);

export const editProduccionMalla = createAction(
  '[ProduccionMalla] Edit ProduccionMalla',
  props<{ produccionMalla: ProduccionMalla }>()
);

export const updateProduccionMalla = createAction(
  '[ProduccionMalla] Update ProduccionMalla',
  props<{ produccionMalla: ProduccionMalla | any }>()
);

export const updateProduccionMallaSuccess = createAction(
  '[ProduccionMalla] Update ProduccionMalla Success',
  props<{ produccionMalla: ProduccionMalla }>()
);

export const updateProduccionMallaFailure = createAction(
  '[ProduccionMalla] Update ProduccionMalla Failure',
  props<{ error: any }>()
);

export const deleteProduccionMalla = createAction(
  '[ProduccionMalla] Delete ProduccionMalla',
  props<{ idproduccionMalla: number }>()
);

export const deleteProduccionMallaSuccess = createAction(
  '[ProduccionMalla] Delete ProduccionMalla Success',
  props<{ idproduccionMalla: number }>()
);

export const deleteProduccionMallaFailure = createAction(
  '[ProduccionMalla] Delete ProduccionMalla Failure',
  props<{ error: any }>()
);
