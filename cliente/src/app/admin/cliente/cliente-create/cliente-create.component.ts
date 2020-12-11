import {Component, Input, OnInit} from '@angular/core';
import {ClienteState} from '../../../store/reducers/cliente.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaCliente, storeCliente} from '../../../store/actions/cliente.actions';
import {NgxSpinnerService} from 'ngx-spinner';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styles: []
})
export class ClienteCreateComponent implements OnInit {

  @Input() clienteState: ClienteState;

  clienteGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.clienteGroup = this.fb.group({
      nombres: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null),
      celular: new FormControl(null, [Validators.required])
    });
  }

  onStore(): any {
    this.store.dispatch(storeCliente({
      cliente: this.clienteGroup.value
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaCliente({
      location: 'index'
    }));
  }

}
