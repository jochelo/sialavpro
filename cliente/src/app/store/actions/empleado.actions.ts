import {createAction, props} from '@ngrx/store';
import {Empleado} from '../../models/empleado';
import {Paginate} from '../../models/paginate';

export const irVistaEmpleado = createAction(
  '[Empleado] Ir a una vista de empleados',
  props<{ location: string }>()
);

export const getEmpleadosMalleros = createAction(
  '[Empleado] Lista de Empleados que producen mallas'
);

export const getEmpleadosMallerosSuccess = createAction(
  '[Empleado] Lista de Empleados que producen mallas Success',
  props<{ empleados: Empleado[] }>()
);

export const getEmpleadosMallerosFailure = createAction(
  '[Empleado] Lista de Empleados que producen mallas Failure',
  props<{ error: any }>()
);

export const paginateEmpleados = createAction(
  '[Empleado] Paginacion de Empleados',
  props<{ items: number, page: number }>()
);

export const paginateEmpleadosSuccess = createAction(
  '[Empleado] Paginacion de Empleados Success',
  props<{ empleados: Empleado[], paginacion: Paginate }>()
);

export const paginateEmpleadosFailure = createAction(
  '[Empleado] Paginacion de Empleados Failure',
  props<{ error: any }>()
);

export const storeEmpleado = createAction(
  '[Empleado] Store Empleado',
  props<{ empleado: Empleado | any }>()
);

export const storeEmpleadoSuccess = createAction(
  '[Empleado] Store Empleado Success',
  props<{ empleado: Empleado }>()
);

export const storeEmpleadoFailure = createAction(
  '[Empleado] Store Empleado Failure',
  props<{ error: any }>()
);

export const editEmpleado = createAction(
  '[Empleado] Edit Empleado',
  props<{ empleado: Empleado }>()
);

export const updateEmpleado = createAction(
  '[Empleado] Update Empleado',
  props<{ empleado: Empleado | any }>()
);

export const updateEmpleadoSuccess = createAction(
  '[Empleado] Update Empleado Success',
  props<{ empleado: Empleado }>()
);

export const updateEmpleadoFailure = createAction(
  '[Empleado] Update Empleado Failure',
  props<{ error: any }>()
);

export const deleteEmpleado = createAction(
  '[Empleado] Delete Empleado',
  props<{ idempleado: number }>()
);

export const deleteEmpleadoSuccess = createAction(
  '[Empleado] Delete Empleado Success',
  props<{ idempleado: number }>()
);

export const deleteEmpleadoFailure = createAction(
  '[Empleado] Delete Empleado Failure',
  props<{ error: any }>()
);
