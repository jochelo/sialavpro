import {Component, Input, OnInit} from '@angular/core';
import {faCoins, faDonate, faSearchDollar, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {PedidoState} from '../../../store/reducers/pedido.reducer';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {irVistaPedido, updateImportePedido, updateImportePedidoFailure, updatePedido} from '../../../store/actions/pedido.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-pedido-edit',
  templateUrl: './pedido-edit.component.html',
  styles: []
})
export class PedidoEditComponent implements OnInit {

  @Input() pedidoState: PedidoState;

  faSpinner = faSpinner;
  faCoins = faCoins;
  faDonate = faDonate;
  faSearchDollar = faSearchDollar;

  pedidoGroup: FormGroup;

  constructor(private store: Store<AdminState>,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.pedidoGroup = this.fb.group({
      importe: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.pedidoState.pedido.total - this.pedidoState.pedido.cancelado)]),
      pedido_id: new FormControl(this.pedidoState.pedido.id, [Validators.required])
    });
  }

  onChangeImporte(): void {
    if (this.pedidoState.pedido.total - this.pedidoState.pedido.cancelado - this.pedidoGroup.value.importe < 0) {
      setTimeout(() => {
        this.pedidoGroup.patchValue({
          importe: this.pedidoState.pedido.total - this.pedidoState.pedido.cancelado
        });
      }, 50);
    }
    if (this.pedidoGroup.value.importe < 0) {
      setTimeout(() => {
        this.pedidoGroup.patchValue({
          importe: 1
        });
      }, 50);
    }
  }

  onStore(): void {
    if (confirm('¿Está seguro de actualizar el monto cancelado de este pedido?')) {
      // this.pedidoState.pedido.cancelado += this.pedidoGroup.value.importe;
      this.store.dispatch(updateImportePedido({
        data: this.pedidoGroup.value
      }));
    }
  }

  onCancel(): void {
    this.store.dispatch(irVistaPedido({
      location: 'index'
    }));
  }

}
