import { Component, OnInit } from '@angular/core';
import {AlambreState} from '../../store/reducers/alambre.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaAlambre} from '../../store/actions/alambre.actions';

@Component({
  selector: 'app-alambre',
  templateUrl: './alambre.component.html',
  styles: [
  ]
})
export class AlambreComponent implements OnInit {

  alambreState: AlambreState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.alambreState = state.admin.alambre;
    });
    this.store.dispatch(irVistaAlambre({
      location: 'index'
    }));
  }

}
