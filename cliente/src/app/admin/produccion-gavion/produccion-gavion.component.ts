import { Component, OnInit } from '@angular/core';
import {ProduccionGavionState} from '../../store/reducers/produccion-gavion.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaProduccionGavion} from '../../store/actions/produccion-gavion.actions';

@Component({
  selector: 'app-produccion-gavion',
  templateUrl: './produccion-gavion.component.html',
  styles: [
  ]
})
export class ProduccionGavionComponent implements OnInit {

  produccionGavionState: ProduccionGavionState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.produccionGavionState = state.admin.produccionGavion;
    });
    this.store.dispatch(irVistaProduccionGavion({
      location: 'index'
    }));
  }

}
