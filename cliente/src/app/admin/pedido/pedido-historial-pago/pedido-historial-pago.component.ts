import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { historialPagosPedido, irVistaPedido } from 'src/app/store/actions/pedido.actions';
import { AdminState } from 'src/app/store/reducers/admin.reducer';
import { PedidoState } from 'src/app/store/reducers/pedido.reducer';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-pedido-historial-pago',
  templateUrl: './pedido-historial-pago.component.html',
  styles: [
  ]
})
export class PedidoHistorialPagoComponent implements OnInit {

  @Input() pedidoState: PedidoState;

  constructor(private store: Store<AdminState>) { }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(historialPagosPedido({
      pedido: this.pedidoState.pedido
    }))
  }

  onCancel() {
    this.store.dispatch(irVistaPedido({
      location: 'index'
    }));
  }

}
