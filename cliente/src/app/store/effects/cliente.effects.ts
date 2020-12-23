import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {ClienteService} from '../../services/cliente.service';
import {
  deleteCliente, deleteClienteFailure, deleteClienteSuccess, getClientes, getClientesFailure, getClientesSuccess,
  paginateClientes,
  paginateClientesFailure,
  paginateClientesSuccess, showCliente, showClienteFailure, showClienteSuccess,
  storeCliente,
  storeClienteFailure,
  storeClienteSuccess, updateCliente, updateClienteFailure, updateClienteSuccess
} from '../actions/cliente.actions';
import {Paginate} from '../../models/paginate';
import {Cliente} from '../../models/cliente';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ClienteEffects {

  getClientes$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getClientes),
        switchMap(() => {
          return this.clienteService.getClientes()
            .pipe(
              map((response: Cliente[]) => {
                return getClientesSuccess({
                  clientes: response
                });
              }),
              catchError(error => of(getClientesFailure(error)))
            );
        })
      ));

  paginateClientes$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateClientes),
        switchMap((props: { items: number, page: number }) => {
          return this.clienteService.paginateClientes(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateClientesSuccess({
                  clientes: response.data,
                  paginacion: new Paginate(
                    response.current_page,
                    response.from,
                    response.last_page,
                    response.per_page,
                    response.to,
                    response.total,
                    pages
                  )
                });
              }),
              catchError(error => of(paginateClientesFailure(error)))
            );
        })
      ));

  storeCliente$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeCliente),
        switchMap((props: { cliente: Cliente | any }) => {
          this.spinner.show();
          return this.clienteService.storeCliente(props.cliente)
            .pipe(
              map((response: Cliente) => {
                this.spinner.hide();
                this.toastr.success('Cliente registrado Exitosamente');
                return storeClienteSuccess({
                  cliente: response
                });
              }),
              catchError(error => of(storeClienteFailure(error)))
            );
        })
      ));

  showCliente$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(showCliente),
        switchMap((props: { idcliente: number }) => {
          this.spinner.show();
          return this.clienteService.showCliente(props.idcliente)
            .pipe(
              map((response: Cliente) => {
                this.spinner.hide();
                this.toastr.success('Cliente Encontrado');
                return showClienteSuccess({
                  cliente: response
                });
              }),
              catchError(error => of(showClienteFailure(error)))
            );
        })
      ));

  updateCliente$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateCliente),
        switchMap((props: { cliente: Cliente | any }) => {
          this.spinner.show();
          return this.clienteService.updateCliente(props.cliente)
            .pipe(
              map((response: Cliente) => {
                this.spinner.hide();
                this.toastr.success('Cliente actualizado Exitosamente');
                return updateClienteSuccess({
                  cliente: response
                });
              }),
              catchError(error => of(updateClienteFailure(error)))
            );
        })
      ));

  deleteCliente$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteCliente),
        switchMap((props: { idcliente: number }) => {
          this.spinner.show();
          return this.clienteService.deleteCliente(props.idcliente)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Cliente eliminado Exitosamente');
                return deleteClienteSuccess({
                  idcliente: response
                });
              }),
              catchError(error => of(deleteClienteFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private clienteService: ClienteService,
              private router: Router) {
  }

}
