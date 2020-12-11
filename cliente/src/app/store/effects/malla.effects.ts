import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {MallaService} from '../../services/malla.service';
import {
  deleteMalla, deleteMallaFailure, deleteMallaSuccess, getMallas, getMallasFailure, getMallasSuccess,
  paginateMallas,
  paginateMallasFailure,
  paginateMallasSuccess,
  storeMalla,
  storeMallaFailure,
  storeMallaSuccess, updateMalla, updateMallaFailure, updateMallaSuccess
} from '../actions/malla.actions';
import {Paginate} from '../../models/paginate';
import {Malla} from '../../models/malla';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class MallaEffects {

  getMallas$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getMallas),
        switchMap(() => {
          return this.mallaService.getMallas()
            .pipe(
              map((response: Malla[]) => {
                return getMallasSuccess({
                  mallas: response,
                });
              }),
              catchError(error => of(getMallasFailure(error)))
            );
        })
      ));

  paginateMallas$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateMallas),
        switchMap((props: { items: number, page: number }) => {
          return this.mallaService.paginateMallas(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateMallasSuccess({
                  mallas: response.data,
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
              catchError(error => of(paginateMallasFailure(error)))
            );
        })
      ));

  storeMalla$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeMalla),
        switchMap((props: { malla: Malla | any }) => {
          this.spinner.show();
          return this.mallaService.storeMalla(props.malla)
            .pipe(
              map((response: Malla) => {
                this.spinner.hide();
                this.toastr.success('Malla registrada Exitosamente');
                return storeMallaSuccess({
                  malla: response
                });
              }),
              catchError(error => of(storeMallaFailure(error)))
            );
        })
      ));

  updateMalla$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateMalla),
        switchMap((props: { malla: Malla | any }) => {
          this.spinner.show();
          return this.mallaService.updateMalla(props.malla)
            .pipe(
              map((response: Malla) => {
                this.spinner.hide();
                this.toastr.success('Malla actualizada Exitosamente');
                return updateMallaSuccess({
                  malla: response
                });
              }),
              catchError(error => of(updateMallaFailure(error)))
            );
        })
      ));

  deleteMalla$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteMalla),
        switchMap((props: { idmalla: number }) => {
          this.spinner.show();
          return this.mallaService.deleteMalla(props.idmalla)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Malla eliminada Exitosamente');
                return deleteMallaSuccess({
                  idmalla: response
                });
              }),
              catchError(error => of(deleteMallaFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private mallaService: MallaService,
              private router: Router) {
  }

}
