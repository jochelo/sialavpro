import { Component, OnInit } from '@angular/core';
import {ProduccionMallaState} from '../../store/reducers/produccion-malla.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaProduccionMalla} from '../../store/actions/produccion-malla.actions';

@Component({
  selector: 'app-produccion-malla',
  templateUrl: './produccion-malla.component.html',
  styles: [
  ]
})
export class ProduccionMallaComponent implements OnInit {

  produccionMallaState: ProduccionMallaState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.produccionMallaState = state.admin.produccionMalla;
    });
    this.store.dispatch(irVistaProduccionMalla({
      location: 'index'
    }));
  }

}
