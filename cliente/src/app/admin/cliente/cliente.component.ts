import { Component, OnInit } from '@angular/core';
import {ClienteState} from '../../store/reducers/cliente.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaCliente} from '../../store/actions/cliente.actions';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  clienteState: ClienteState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    this.store.subscribe( (state: any) => {
      this.clienteState = state.admin.cliente;
    });
    this.store.dispatch(irVistaCliente({
      location: 'index'
    }));
  }

}
