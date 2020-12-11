import {ActionReducerMap} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {MallaState} from './malla.reducer';
import {GavionState} from './gavion.reducer';
import {AlambreState} from './alambre.reducer';
import {CajaclavoState} from './cajaclavo.reducer';
import {ClienteState} from './cliente.reducer';
import {EmpleadoState} from './empleado.reducer';
import {ReservaState} from './reserva.reducer';
import {ProduccionMallaState} from './produccion-malla.reducer';
import * as fromAuth from './auth.reducer';
import * as fromMalla from './malla.reducer';
import * as fromGavion from './gavion.reducer';
import * as fromAlambre from './alambre.reducer';
import * as fromCajaclavo from './cajaclavo.reducer';
import * as fromCliente from './cliente.reducer';
import * as fromEmpleado from './empleado.reducer';
import * as fromReserva from './reserva.reducer';
import * as fromProduccionMalla from './produccion-malla.reducer';

export interface AdminState {
  auth: AuthState;
  malla: MallaState;
  gavion: GavionState;
  alambre: AlambreState;
  cajaclavo: CajaclavoState;
  cliente: ClienteState;
  empleado: EmpleadoState;
  reserva: ReservaState;
  produccionMalla: ProduccionMallaState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  auth: fromAuth.reducer,
  malla: fromMalla.reducer,
  gavion: fromGavion.reducer,
  alambre: fromAlambre.reducer,
  cajaclavo: fromCajaclavo.reducer,
  cliente: fromCliente.reducer,
  empleado: fromEmpleado.reducer,
  reserva: fromReserva.reducer,
  produccionMalla: fromProduccionMalla.reducer
};
