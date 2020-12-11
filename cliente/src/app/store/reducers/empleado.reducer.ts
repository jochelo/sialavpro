import {Action, createReducer, on} from '@ngrx/store';
import {Empleado} from '../../models/empleado';
import {Paginate} from '../../models/paginate';
import {
  deleteEmpleado,
  deleteEmpleadoFailure,
  deleteEmpleadoSuccess,
  editEmpleado,
  getEmpleadosMalleros,
  getEmpleadosMallerosFailure,
  getEmpleadosMallerosSuccess,
  irVistaEmpleado,
  paginateEmpleados,
  paginateEmpleadosFailure,
  paginateEmpleadosSuccess,
  storeEmpleado,
  storeEmpleadoFailure,
  storeEmpleadoSuccess,
  updateEmpleado,
  updateEmpleadoFailure,
  updateEmpleadoSuccess
} from '../actions/empleado.actions';
import {HttpErrorResponse} from '@angular/common/http';

export const empleadoFeatureKey = 'empleado';

export interface EmpleadoState {
  empleado: Empleado;
  empleados: Empleado[];
  paginacion: Paginate;
  location: string;
  loaded: boolean;
  loading: boolean;
  message: string;
  error: HttpErrorResponse;
}

export const initialState: EmpleadoState = {
  empleado: null,
  empleados: [],
  paginacion: null,
  location: null,
  loaded: false,
  loading: false,
  message: null,
  error: null
};

const empleadoReducer = createReducer(
  initialState,
  on(irVistaEmpleado, (state: EmpleadoState, props) => ({
    ...state,
    location: props.location
  })),
  on(getEmpleadosMalleros, (state: EmpleadoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Empleados',
  })),
  on(getEmpleadosMallerosSuccess, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    empleados: props.empleados,
    message: null
  })),
  on(getEmpleadosMallerosFailure, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(paginateEmpleados, (state: EmpleadoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Cargando Lista de Empleados',
  })),
  on(paginateEmpleadosSuccess, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    empleados: props.empleados,
    paginacion: props.paginacion,
    message: null
  })),
  on(paginateEmpleadosFailure, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(storeEmpleado, (state: EmpleadoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Registrando Empleado'
  })),
  on(storeEmpleadoSuccess, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    empleados: [...state.empleados, props.empleado],
    message: null,
  })),
  on(storeEmpleadoFailure, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(editEmpleado, (state: EmpleadoState, props) => ({
    ...state,
    empleado: props.empleado,
    location: 'edit'
  })),
  on(updateEmpleado, (state: EmpleadoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Actualizando Empleado'
  })),
  on(updateEmpleadoSuccess, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    location: 'index',
    empleados: state.empleados.map((empleado: Empleado) => {
      if (empleado.id === props.empleado.id) {
        return props.empleado;
      }
      return empleado;
    }),
    message: null,
  })),
  on(updateEmpleadoFailure, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
  on(deleteEmpleado, (state: EmpleadoState, props) => ({
    ...state,
    loading: true,
    loaded: false,
    message: 'Eliminando Empleado'
  })),
  on(deleteEmpleadoSuccess, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: true,
    // location: 'index',
    empleados: state.empleados.filter((empleado: Empleado) => empleado.id !== props.idempleado),
    message: null,
  })),
  on(deleteEmpleadoFailure, (state: EmpleadoState, props) => ({
    ...state,
    loading: false,
    loaded: false,
    message: props.error.message,
    error: props.error
  })),
);

export function reducer(state: EmpleadoState | undefined, action: Action): any {
  return empleadoReducer(state, action);
}
