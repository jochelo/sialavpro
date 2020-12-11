import { Component, OnInit } from '@angular/core';
import {ReservaState} from '../../store/reducers/reserva.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaReserva} from '../../store/actions/reserva.actions';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styles: []
})
export class ReservaComponent implements OnInit {

  reservaState: ReservaState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.reservaState = state.admin.reserva;
    });
    this.store.dispatch(irVistaReserva({
      location: 'index'
    }));
  }

}
