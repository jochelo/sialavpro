import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {CajaclavoService} from '../../services/cajaclavo.service';
import {
  deleteCajaclavo, deleteCajaclavoFailure, deleteCajaclavoSuccess, getCajaclavos, getCajaclavosFailure, getCajaclavosSuccess,
  paginateCajaclavos,
  paginateCajaclavosFailure,
  paginateCajaclavosSuccess,
  storeCajaclavo,
  storeCajaclavoFailure,
  storeCajaclavoSuccess, updateCajaclavo, updateCajaclavoFailure, updateCajaclavoSuccess
} from '../actions/cajaclavo.actions';
import {Paginate} from '../../models/paginate';
import {Cajaclavo} from '../../models/cajaclavo';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class CajaclavoEffects {

  getCajaclavos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getCajaclavos),
        switchMap(() => {
          return this.cajaclavoService.getCajaclavos()
            .pipe(
              map((response: Cajaclavo[]) => {
                return getCajaclavosSuccess({
                  cajaclavos: response
                });
              }),
              catchError(error => of(getCajaclavosFailure(error)))
            );
        })
      ));

  paginateCajaclavos$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateCajaclavos),
        switchMap((props: { items: number, page: number }) => {
          return this.cajaclavoService.paginateCajaclavos(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateCajaclavosSuccess({
                  cajaclavos: response.data,
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
              catchError(error => of(paginateCajaclavosFailure(error)))
            );
        })
      ));

  storeCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeCajaclavo),
        switchMap((props: { cajaclavo: Cajaclavo | any }) => {
          this.spinner.show();
          return this.cajaclavoService.storeCajaclavo(props.cajaclavo)
            .pipe(
              map((response: Cajaclavo) => {
                this.spinner.hide();
                this.toastr.success('Cajaclavo registrada Exitosamente');
                return storeCajaclavoSuccess({
                  cajaclavo: response
                });
              }),
              catchError(error => of(storeCajaclavoFailure(error)))
            );
        })
      ));

  updateCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateCajaclavo),
        switchMap((props: { cajaclavo: Cajaclavo | any }) => {
          this.spinner.show();
          return this.cajaclavoService.updateCajaclavo(props.cajaclavo)
            .pipe(
              map((response: Cajaclavo) => {
                this.spinner.hide();
                this.toastr.success('Cajaclavo actualizada Exitosamente');
                return updateCajaclavoSuccess({
                  cajaclavo: response
                });
              }),
              catchError(error => of(updateCajaclavoFailure(error)))
            );
        })
      ));

  deleteCajaclavo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteCajaclavo),
        switchMap((props: { idcajaclavo: number }) => {
          this.spinner.show();
          return this.cajaclavoService.deleteCajaclavo(props.idcajaclavo)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Cajaclavo eliminada Exitosamente');
                return deleteCajaclavoSuccess({
                  idcajaclavo: response
                });
              }),
              catchError(error => of(deleteCajaclavoFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private cajaclavoService: CajaclavoService,
              private router: Router) {
  }

}
