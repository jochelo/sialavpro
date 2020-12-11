import { Component, OnInit } from '@angular/core';
import {MallaState} from '../../store/reducers/malla.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaMalla} from '../../store/actions/malla.actions';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styles: [
  ]
})
export class MallaComponent implements OnInit {

  mallaState: MallaState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.mallaState = state.admin.malla;
    });
    this.store.dispatch(irVistaMalla({
      location: 'index'
    }));
  }

}
