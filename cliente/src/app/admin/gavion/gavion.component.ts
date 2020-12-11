import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {GavionState} from '../../store/reducers/gavion.reducer';
import {irVistaGavion} from '../../store/actions/gavion.actions';

@Component({
  selector: 'app-gavion',
  templateUrl: './gavion.component.html',
  styles: []
})
export class GavionComponent implements OnInit {

  gavionState: GavionState;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    this.store.subscribe((state: any) => {
      this.gavionState = state.admin.gavion;
    });
    this.store.dispatch(irVistaGavion({
      location: 'index'
    }));
  }

}
