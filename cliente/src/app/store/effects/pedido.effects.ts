import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, range } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';
import {
  deletePedido,
  deletePedidoFailure,
  deletePedidoSuccess,
  getPedidos,
  getPedidosFailure,
  getPedidosSuccess,
  historialPagosPedido,
  historialPagosPedidoFailure,
  historialPagosPedidoSuccess,
  paginatePedidos,
  paginatePedidosFailure,
  paginatePedidosSuccess,
  searchPedidos,
  searchPedidosFailure,
  searchPedidosSuccess,
  storePedido,
  storePedidoFailure,
  storePedidoSuccess,
  updateImportePedido,
  updateImportePedidoFailure,
  updateImportePedidoSuccess,
  updatePedido,
  updatePedidoFailure,
  updatePedidoSuccess
} from '../actions/pedido.actions';
import { Paginate } from '../../models/paginate';
import { Pedido } from '../../models/pedido';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImportePedido } from 'src/app/models/importe-pedido';

@Injectable()
export class PedidoEffects {

  getPedidos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getPedidos),
        switchMap(() => {
          return this.pedidoService.getPedidos()
            .pipe(
              map((response: Pedido[]) => {
                return getPedidosSuccess({
                  pedidos: response,
                });
              }),
              catchError(error => of(getPedidosFailure(error)))
            );
        })
      ));

  paginatePedidos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginatePedidos),
        switchMap((props: { items: number, page: number }) => {
          return this.pedidoService.paginatePedidos(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginatePedidosSuccess({
                  pedidos: response.data,
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
              catchError(error => of(paginatePedidosFailure(error)))
            );
        })
      ));

  searchPedidos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(searchPedidos),
        switchMap((props: { items: number, page: number, data: any }) => {
          return this.pedidoService.searchPedidos(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return searchPedidosSuccess({
                  pedidos: response.data,
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
              catchError(error => of(searchPedidosFailure(error)))
            );
        })
      ));

  storePedido$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storePedido),
        switchMap((props: { data: any }) => {
          this.spinner.show();
          return this.pedidoService.storePedido(props.data)
            .pipe(
              map((response: Pedido) => {
                this.spinner.hide();
                if (props.data.pedido.entregado) {
                  this.toastr.success('Pedido registrado para entrega Exitosamente');
                } else {
                  this.toastr.warning('Pedido registrado, pendiente de Entrega');
                }
                return storePedidoSuccess({
                  pedido: response
                });
              }),
              catchError(error => {
                this.spinner.hide();
                return of(storePedidoFailure(error));
              })
            );
        })
      ));

  updateImportePedido$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateImportePedido),
        switchMap((props: { data: any }) => {
          this.spinner.show();
          return this.pedidoService.updateImportePedido(props.data)
            .pipe(
              map((response: Pedido) => {
                this.spinner.hide();
                this.toastr.success('Importe registrado Exitosamente');
                return updateImportePedidoSuccess({
                  pedido: response
                });
              }),
              catchError(error => of(updateImportePedidoFailure(error)))
            );
        })
      ));

  updatePedido$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updatePedido),
        switchMap((props: { pedido: Pedido | any }) => {
          this.spinner.show();
          return this.pedidoService.updatePedido(props.pedido)
            .pipe(
              map((response: Pedido) => {
                this.spinner.hide();
                this.toastr.success('Pedido actualizado Exitosamente');
                return updatePedidoSuccess({
                  pedido: response
                });
              }),
              catchError(error => {
                this.spinner.hide();
                return of(updatePedidoFailure(error));
              })
            );
        })
      ));

  historialPagosPedido$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(historialPagosPedido),
        switchMap((props: { pedido: Pedido }) => {
          this.spinner.show();
          return this.pedidoService.historialPagosPedido(props.pedido.id)
            .pipe(
              map((response: ImportePedido[]) => {
                this.spinner.hide();
                this.toastr.success('Lista de Importes rescatada Exitosamente');
                return historialPagosPedidoSuccess({
                  importesPedido: response
                });
              }),
              catchError(error => of(historialPagosPedidoFailure(error)))
            );
        })
      ));

  deletePedido$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deletePedido),
        switchMap((props: { idpedido: number }) => {
          this.spinner.show();
          return this.pedidoService.deletePedido(props.idpedido)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Pedido eliminado Exitosamente');
                return deletePedidoSuccess({
                  idpedido: response
                });
              }),
              catchError(error => of(deletePedidoFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private pedidoService: PedidoService,
    private router: Router) {
  }

}
