import {Component, OnInit} from '@angular/core';
import {PedidoState} from '../../store/reducers/pedido.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {irVistaPedido} from '../../store/actions/pedido.actions';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  pedidoState: PedidoState;

  constructor(private store: Store<AdminState>,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.subscribe((state: any) => {
      this.pedidoState = state.admin.pedido;
    });
    this.route.params.subscribe((param: Params) => {
      this.store.dispatch(irVistaPedido({
        location: param.tipo
      }));
    });
  }

}
