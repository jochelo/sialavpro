import {Component, Input, OnInit} from '@angular/core';
import {ClienteState} from '../../../store/reducers/cliente.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaCliente, updateCliente} from '../../../store/actions/cliente.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styles: []
})
export class ClienteEditComponent implements OnInit {

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
      nombres: new FormControl(this.clienteState.cliente.nombres, [Validators.required]),
      apellidos: new FormControl(this.clienteState.cliente.apellidos, [Validators.required]),
      direccion: new FormControl(this.clienteState.cliente.direccion, [Validators.required]),
      celular: new FormControl(this.clienteState.cliente.celular, [Validators.required]),
      id: new FormControl(this.clienteState.cliente.id),
    });
  }

  onUpdate(): any {
    this.store.dispatch(updateCliente({
      cliente: this.clienteGroup.value
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaCliente({
      location: 'index'
    }));
  }

}
