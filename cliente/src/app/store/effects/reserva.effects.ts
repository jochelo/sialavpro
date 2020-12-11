import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {ReservaService} from '../../services/reserva.service';
import {
  deleteReserva, deleteReservaFailure, deleteReservaSuccess,
  paginateReservas,
  paginateReservasFailure,
  paginateReservasSuccess, recepcionarReserva, recepcionarReservaFailure, recepcionarReservaSuccess,
  storeReserva,
  storeReservaFailure,
  storeReservaSuccess, updateReserva, updateReservaFailure, updateReservaSuccess
} from '../actions/reserva.actions';
import {Paginate} from '../../models/paginate';
import {Reserva} from '../../models/reserva';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ReservaEffects {

  paginateReservas$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateReservas),
        switchMap((props: { items: number, page: number }) => {
          return this.reservaService.paginateReservas(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateReservasSuccess({
                  reservas: response.data,
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
              catchError(error => of(paginateReservasFailure(error)))
            );
        })
      ));

  storeReserva$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeReserva),
        switchMap((props: { reserva: Reserva | any }) => {
          this.spinner.show();
          return this.reservaService.storeReserva(props.reserva)
            .pipe(
              map((response: Reserva) => {
                this.spinner.hide();
                this.toastr.success(`${response.nombre.split(' ')[0]}.. Su Reserva a sido registrada Exitosamente`);
                return storeReservaSuccess({
                  reserva: response
                });
              }),
              catchError(error => {
                this.spinner.hide();
                return of(storeReservaFailure(error));
              })
            );
        })
      ));

  updateReserva$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateReserva),
        switchMap((props: { reserva: Reserva | any }) => {
          this.spinner.show();
          return this.reservaService.updateReserva(props.reserva)
            .pipe(
              map((response: Reserva) => {
                this.spinner.hide();
                this.toastr.success('Reserva actualizado Exitosamente');
                return updateReservaSuccess({
                  reserva: response
                });
              }),
              catchError(error => of(updateReservaFailure(error)))
            );
        })
      ));

  recepcionarReserva$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recepcionarReserva),
        switchMap((props: { idreserva: number, recepcionado: boolean }) => {
          this.spinner.show();
          return this.reservaService.recepcionar(props)
            .pipe(
              map((response: Reserva) => {
                this.spinner.hide();
                this.toastr.success('Reserva actualizada Exitosamente');
                return recepcionarReservaSuccess({
                  reserva: response
                });
              }),
              catchError(error => of(recepcionarReservaFailure(error)))
            );
        })
      ));

  deleteReserva$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteReserva),
        switchMap((props: { idreserva: number }) => {
          this.spinner.show();
          return this.reservaService.deleteReserva(props.idreserva)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Reserva eliminado Exitosamente');
                return deleteReservaSuccess({
                  idreserva: response
                });
              }),
              catchError(error => of(deleteReservaFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private reservaService: ReservaService,
              private router: Router) {
  }

}
