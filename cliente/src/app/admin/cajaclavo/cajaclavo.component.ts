import { Component, OnInit } from '@angular/core';
import {CajaclavoState} from '../../store/reducers/cajaclavo.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaCajaclavo} from '../../store/actions/cajaclavo.actions';

@Component({
  selector: 'app-cajaclavo',
  templateUrl: './cajaclavo.component.html',
  styles: [
  ]
})
export class CajaclavoComponent implements OnInit {

  cajaclavoState: CajaclavoState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.cajaclavoState = state.admin.cajaclavo;
    });
    this.store.dispatch(irVistaCajaclavo({
      location: 'index'
    }));
  }

}
