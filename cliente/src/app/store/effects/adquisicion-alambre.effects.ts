import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {AdquisicionAlambreService} from '../../services/adquisicion-alambre.service';
import {
  deleteAdquisicionAlambre,
  deleteAdquisicionAlambreFailure,
  deleteAdquisicionAlambreSuccess,
  getAdquisicionAlambres,
  getAdquisicionAlambresFailure,
  getAdquisicionAlambresSuccess,
  paginateAdquisicionAlambres,
  paginateAdquisicionAlambresFailure,
  paginateAdquisicionAlambresSuccess,
  storeAdquisicionAlambre,
  storeAdquisicionAlambreFailure,
  storeAdquisicionAlambreSuccess,
  updateAdquisicionAlambre,
  updateAdquisicionAlambreFailure,
  updateAdquisicionAlambreSuccess
} from '../actions/adquisicion-alambre.actions';
import {Paginate} from '../../models/paginate';
import {AdquisicionAlambre} from '../../models/adquisicion-alambre';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class AdquisicionAlambreEffects {

  getAdquisicionAlambres$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getAdquisicionAlambres),
        switchMap(() => {
          return this.adquisicionAlambreService.getAdquisicionAlambres()
            .pipe(
              map((response: AdquisicionAlambre[]) => {
                return getAdquisicionAlambresSuccess({
                  adquisicionAlambres: response
                });
              }),
              catchError(error => of(getAdquisicionAlambresFailure(error)))
            );
        })
      ));

  paginateAdquisicionAlambres$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateAdquisicionAlambres),
        switchMap((props: { items: number, page: number }) => {
          return this.adquisicionAlambreService.paginateAdquisicionAlambres(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateAdquisicionAlambresSuccess({
                  adquisicionAlambres: response.data,
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
              catchError(error => of(paginateAdquisicionAlambresFailure(error)))
            );
        })
      ));

  storeAdquisicionAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeAdquisicionAlambre),
        switchMap((props: { adquisicionAlambre: AdquisicionAlambre | any }) => {
          this.spinner.show();
          return this.adquisicionAlambreService.storeAdquisicionAlambre(props.adquisicionAlambre)
            .pipe(
              map((response: AdquisicionAlambre) => {
                this.spinner.hide();
                this.toastr.success('AdquisicionAlambre registrado Exitosamente');
                return storeAdquisicionAlambreSuccess({
                  adquisicionAlambre: response
                });
              }),
              catchError(error => of(storeAdquisicionAlambreFailure(error)))
            );
        })
      ));

  updateAdquisicionAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateAdquisicionAlambre),
        switchMap((props: { adquisicionAlambre: AdquisicionAlambre | any }) => {
          this.spinner.show();
          return this.adquisicionAlambreService.updateAdquisicionAlambre(props.adquisicionAlambre)
            .pipe(
              map((response: AdquisicionAlambre) => {
                this.spinner.hide();
                this.toastr.success('AdquisicionAlambre actualizado Exitosamente');
                return updateAdquisicionAlambreSuccess({
                  adquisicionAlambre: response
                });
              }),
              catchError(error => of(updateAdquisicionAlambreFailure(error)))
            );
        })
      ));

  deleteAdquisicionAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteAdquisicionAlambre),
        switchMap((props: { idadquisicionAlambre: number }) => {
          this.spinner.show();
          return this.adquisicionAlambreService.deleteAdquisicionAlambre(props.idadquisicionAlambre)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('AdquisicionAlambre eliminado Exitosamente');
                return deleteAdquisicionAlambreSuccess({
                  idadquisicionAlambre: response
                });
              }),
              catchError(error => of(deleteAdquisicionAlambreFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private adquisicionAlambreService: AdquisicionAlambreService,
              private router: Router) {
  }

}
