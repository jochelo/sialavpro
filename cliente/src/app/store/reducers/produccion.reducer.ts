import {ActionReducerMap} from '@ngrx/store';
import {EmpleadoState} from './empleado.reducer';
import {MallaState} from './malla.reducer';
import {GavionState} from './gavion.reducer';
import {ProduccionMallaState} from './produccion-malla.reducer';
import {ProduccionGavionState} from './produccion-gavion.reducer';
import * as fromEmpleado from './empleado.reducer';
import * as fromMalla from './malla.reducer';
import * as fromGavion from './gavion.reducer';
import * as fromProduccionMalla from './produccion-malla.reducer';
import * as fromProduccionGavion from './produccion-gavion.reducer';


export interface ProduccionState {
  empleado: EmpleadoState;
  malla: MallaState;
  gavion: GavionState;
  produccionMalla: ProduccionMallaState;
  produccionGavion: ProduccionGavionState;
}

export const produccionReducers: ActionReducerMap<ProduccionState> = {
  empleado: fromEmpleado.reducer,
  malla: fromMalla.reducer,
  gavion: fromGavion.reducer,
  produccionMalla: fromProduccionMalla.reducer,
  produccionGavion: fromProduccionGavion.reducer
};
