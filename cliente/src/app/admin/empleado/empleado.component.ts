import { Component, OnInit } from '@angular/core';
import {EmpleadoState} from '../../store/reducers/empleado.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaEmpleado} from '../../store/actions/empleado.actions';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent implements OnInit {

  empleadoState: EmpleadoState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.empleadoState = state.admin.empleado;
    });
    this.store.dispatch(irVistaEmpleado({
      location: 'index'
    }));
  }

}
