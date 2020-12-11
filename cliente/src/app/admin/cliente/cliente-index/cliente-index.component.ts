import {Component, Input, OnInit} from '@angular/core';
import {ClienteState} from '../../../store/reducers/cliente.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteCliente, editCliente, irVistaCliente, paginateClientes} from '../../../store/actions/cliente.actions';
import {Cliente} from '../../../models/cliente';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styles: []
})
export class ClienteIndexComponent implements OnInit {

  @Input() clienteState: ClienteState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  cliente: Cliente;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginateClientes({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateClientes({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaCliente({location: 'create'}));
  }

  onEdit(cliente: Cliente): void {
    this.store.dispatch(editCliente({
      cliente
    }));
  }

  onDelete(cliente: Cliente): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Cliente?`)) {
      this.store.dispatch(deleteCliente({
        idcliente: cliente.id
      }));
    }
  }
}
