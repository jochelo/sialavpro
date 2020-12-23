import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {AdquisicionCajaclavoService} from '../../services/adquisicion-cajaclavo.service';
import {
  deleteAdquisicionCajaclavo,
  deleteAdquisicionCajaclavoFailure,
  deleteAdquisicionCajaclavoSuccess,
  getAdquisicionCajaclavos,
  getAdquisicionCajaclavosFailure,
  getAdquisicionCajaclavosSuccess,
  paginateAdquisicionCajaclavos,
  paginateAdquisicionCajaclavosFailure,
  paginateAdquisicionCajaclavosSuccess,
  storeAdquisicionCajaclavo,
  storeAdquisicionCajaclavoFailure,
  storeAdquisicionCajaclavoSuccess,
  updateAdquisicionCajaclavo,
  updateAdquisicionCajaclavoFailure,
  updateAdquisicionCajaclavoSuccess
} from '../actions/adquisicion-cajaclavo.actions';
import {Paginate} from '../../models/paginate';
import {AdquisicionCajaclavo} from '../../models/adquisicion-cajaclavo';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class AdquisicionCajaclavoEffects {

  getAdquisicionCajaclavos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getAdquisicionCajaclavos),
        switchMap(() => {
          return this.adquisicionCajaclavoService.getAdquisicionCajaclavos()
            .pipe(
              map((response: AdquisicionCajaclavo[]) => {
                return getAdquisicionCajaclavosSuccess({
                  adquisicionCajaclavos: response
                });
              }),
              catchError(error => of(getAdquisicionCajaclavosFailure(error)))
            );
        })
      ));

  paginateAdquisicionCajaclavos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateAdquisicionCajaclavos),
        switchMap((props: { items: number, page: number }) => {
          return this.adquisicionCajaclavoService.paginateAdquisicionCajaclavos(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateAdquisicionCajaclavosSuccess({
                  adquisicionCajaclavos: response.data,
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
              catchError(error => of(paginateAdquisicionCajaclavosFailure(error)))
            );
        })
      ));

  storeAdquisicionCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeAdquisicionCajaclavo),
        switchMap((props: { adquisicionCajaclavo: AdquisicionCajaclavo | any }) => {
          this.spinner.show();
          return this.adquisicionCajaclavoService.storeAdquisicionCajaclavo(props.adquisicionCajaclavo)
            .pipe(
              map((response: AdquisicionCajaclavo) => {
                this.spinner.hide();
                this.toastr.success('Adquisicion de Caja clavos registrada Exitosamente');
                return storeAdquisicionCajaclavoSuccess({
                  adquisicionCajaclavo: response
                });
              }),
              catchError(error => of(storeAdquisicionCajaclavoFailure(error)))
            );
        })
      ));

  updateAdquisicionCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateAdquisicionCajaclavo),
        switchMap((props: { adquisicionCajaclavo: AdquisicionCajaclavo | any }) => {
          this.spinner.show();
          return this.adquisicionCajaclavoService.updateAdquisicionCajaclavo(props.adquisicionCajaclavo)
            .pipe(
              map((response: AdquisicionCajaclavo) => {
                this.spinner.hide();
                this.toastr.success('Adquisición de Caja de clavos actualizada Exitosamente');
                return updateAdquisicionCajaclavoSuccess({
                  adquisicionCajaclavo: response
                });
              }),
              catchError(error => of(updateAdquisicionCajaclavoFailure(error)))
            );
        })
      ));

  deleteAdquisicionCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteAdquisicionCajaclavo),
        switchMap((props: { idadquisicionCajaclavo: number }) => {
          this.spinner.show();
          return this.adquisicionCajaclavoService.deleteAdquisicionCajaclavo(props.idadquisicionCajaclavo)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Adquisición de Caja de clavos eliminada Exitosamente');
                return deleteAdquisicionCajaclavoSuccess({
                  idadquisicionCajaclavo: response
                });
              }),
              catchError(error => of(deleteAdquisicionCajaclavoFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private adquisicionCajaclavoService: AdquisicionCajaclavoService,
              private router: Router) {
  }

}
