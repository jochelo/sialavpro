import {Component, Input, OnInit} from '@angular/core';
import {PedidoState} from '../../../store/reducers/pedido.reducer';
import {faDollarSign, faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Pedido} from '../../../models/pedido';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deletePedido, editPedido, irVistaPedido, paginatePedidos, updatePedido} from '../../../store/actions/pedido.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styles: []
})
export class PedidoIndexComponent implements OnInit {

  @Input() pedidoState: PedidoState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faDollarSign = faDollarSign;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  pedido: Pedido;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginatePedidos({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginatePedidos({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaPedido({location: 'create'}));
  }

  onUpdatePago(pedido: Pedido): void {
    this.store.dispatch(editPedido({
      pedido
    }));
  }

  onEntregar(check: boolean, pedido: Pedido): void {
    if (confirm('¿Esta seguro de actualizar el estado del pedido a ENTREGADO?')) {
      if (check) {
        const data = {
          id: pedido.id,
          entregado: true
        };
        this.store.dispatch(updatePedido({
          pedido: data
        }));
      }
    }
  }

  onDelete(pedido: Pedido): void {
    if (confirm(`¿Está seguro de Eliminar este Pedido?`)) {
      this.store.dispatch(deletePedido({
        idpedido: pedido.id
      }));
    }
  }

}
